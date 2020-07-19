import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

// to get random images to create user
import { image } from 'faker';

// to create Custom id depend on time in local machine and add it to new user
import { time } from 'uniqid';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		tokenKey: '',
		users: [],
		resources: [],
		user: {},
		resource: {},
	},
	getters: {
		getToken(state) {
			return state.tokenKey;
		},
		getResources(state) {
			return state.resources;
		},
		getResource(state) {
			return state.resource;
		},
		getUsers(state) {
			return state.users;
		},
		getUser(state) {
			return state.user;
		},
	},
	mutations: {
		editToken(state, payload) {
			state.tokenKey = payload;
		},
		initialResources(state, payload) {
			state.resources = payload;
		},
		initialUsers(state, payload) {
			state.users = payload;
		},
		deleteUser(state, payload) {
			state.users = state.users.filter((user) => user.id !== payload);
		},
		setUser(state, payload) {
			state.user = state.users.filter((item) => item.id == payload);
		},
		updateUser(state, payload) {
			// map through users and get user that id match payload id and then update the information
			state.users.map((user) => {
				if (user.id == payload.id) {
					user.first_name = payload.first_name;
					user.last_name = payload.last_name;
					user.email = payload.email;
				}
			});
		},
		createUser(state, payload) {
			state.users.push({
				first_name: payload.first_name,
				last_name: payload.last_name,
				email: payload.email,
				id: time(),
				avatar: image.avatar(),
			});
		},
		setResource(state, payload) {
			state.resource = state.resources.filter(
				(item) => item.id == payload
			);
		},
	},

	// state to commit mutation and actions are async function that it can fetch api and then commit the mutation
	actions: {
		// get initial Resources data from API and store it in the state
		setResources({ commit }) {
			axios.get('/list?per_page=50').then((res) => {
				commit('initialResources', res.data.data);
			});
		},

		setResource({ commit }, resourceId) {
			commit('setResource', resourceId);
			router.push({ name: 'Resource', params: { id: resourceId } });
		},

		// get initial Users data from API and store it in the state
		setUsers({ commit }) {
			axios.get('/users?page=1&per_page=50').then((res) => {
				commit('initialUsers', res.data.data);
			});
		},

		setUser({ commit }, userId) {
			commit('setUser', userId);
			router.push({ name: 'User', params: { id: userId } });
		},

		// delete an existing user function
		deleteUser({ commit }, userId) {
			axios.delete(`/users/${userId}`).then(() => {
				commit('deleteUser', userId);
			});
		},
		// update an existing user function
		updateUser({ commit }, newUser) {
			axios
				.patch(`/users/${newUser.id}`, {
					first_name: newUser.first_name,
					last_name: newUser.last_name,
					email: newUser.email,
				})
				.then(() => {
					commit('updateUser', newUser);
					router.push({ name: 'Users' });
				});
		},
		// create a new user Function
		createUser({ commit }, user) {
			axios
				.post(`/users`, {
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email,
				})
				.then(() => {
					commit('createUser', user);
					router.push({ name: 'Users' });
				});
		},
		// Login function
		login({ commit }, auth) {
			axios
				.post('/login', {
					email: auth.email,
					password: auth.password,
				})
				.then((res) => {
					// Go to Resource Page
					commit('editToken', res.data.token);
					router.push({ name: 'Resources' });
				});
		},
		// Register function
		register({ commit }, auth) {
			axios
				.post('/register', {
					email: auth.email,
					password: auth.password,
				})
				.then((res) => {
					// Go to Resource Page
					commit('editToken', res.data.token);
					router.push({ name: 'Resources' });
				});
		},
	},
});

export default store;

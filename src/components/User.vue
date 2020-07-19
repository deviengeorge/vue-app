<template>
	<div class="user">
		<h1>User {{ id }}</h1>
		<h4 v-if="err" class="error">
			There Is Something Wrong, Please Check Your Network
		</h4>

		<!-- user Cards -->
		<form class="user-card">
			<img class="avatar" :src="avatar" :alt="first_name" />
			<input type="text" name="first_name" v-model="first_name" />
			<input type="text" name="last_name" v-model="last_name" />
			<input type="email" name="email" v-model="email" />
			<button
				type="submit"
				@click.prevent="updateUser"
				class="update"
			>
				Update
			</button>
			<button
				type="button"
				@click.prevent="cancelUser"
				class="cancel"
			>
				Cancel
			</button>
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'User',
	data() {
		return {
			err: false,
			id: '',
			avatar: '',
			first_name: '',
			last_name: '',
			email: '',
		};
	},
	created() {
		// set all information from Vuex store and store it in user variable and then in the state
		let user = this.getUser()[0];
		this.id = user.id;
		this.email = user.email;
		this.first_name = user.first_name;
		this.last_name = user.last_name;
		this.avatar = user.avatar;
	},
	methods: {
		// get getters from Vuex store
		...mapGetters(['getUser']),

		// function to update user and send the information to the api and then go to users page
		updateUser() {
			const UpdatedUser = {
				first_name: this.first_name,
				last_name: this.last_name,
				email: this.email,
				id: this.id,
			};
			this.$store.dispatch('updateUser', UpdatedUser);
		},

		// function to cancel the edit and go to users page
		cancelUser() {
			this.$router.push({ name: 'Users' });
		},
	},
};
</script>

<style scoped>
.user {
	text-align: center;
	background: #fff;
	border-radius: 10px;
	padding: 50px 95px;
}

.user h1 {
	font-size: 35px;
	font-family: 'Montserrat';
	font-weight: 500;
	margin-bottom: 50px;
}

.user-card {
	background: #fff;
	padding: 0;
	border-radius: 10px;
	font-family: 'Poppins';
}

.user-card * {
	font-family: 'Poppins';
	font-weight: 400;
}

.user-card .avatar {
	object-fit: cover;
	border-radius: 50%;
	margin-bottom: 50px;
}

.user-card input {
	outline: none;
	border: none;
	font-family: 'Poppins', sans-serif;
	font-weight: 500;
	font-size: 15px;
	color: #666666;
	display: block;
	width: 100%;
	background: #e6e6e6;
	height: 50px;
	border-radius: 25px;
	padding: 0 30px;
	margin-bottom: 10px;
	z-index: 1;
}

.user-card .update {
	outline: none;
	border: none;
	color: black;
	background: #00e676;
	border-radius: 10px;
	font-size: 18px;
	padding: 10px 18px;
	margin: 20px 10px 0px 0px;
	cursor: pointer;
}

.user-card .cancel {
	outline: none;
	border: none;
	color: white;
	background: #f03434;
	border-radius: 10px;
	font-size: 18px;
	padding: 10px 18px;
	margin: 20px 0px 0px 10px;
	cursor: pointer;
}

.error {
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
	margin-top: 20px;
}

@media screen and (max-width: 650px) {
	.user-card {
		padding: 35px;
	}
}
</style>

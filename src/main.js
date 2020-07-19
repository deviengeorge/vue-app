import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from 'axios';

// setting BaseURL to Axios to fetch API
axios.defaults.baseURL = 'https://reqres.in/api';

Vue.config.productionTip = false;

// authentication function ( Navigation Guard )
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (!store.getters.getToken) {
			next({
				name: 'Login',
				params: { tokenErr: true },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');

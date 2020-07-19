<template>
	<div id="app">
		<!-- to render all components in here and to take all style -->
		<router-view> </router-view>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	methods: {
		...mapActions(['setResources', 'setUsers']),
	},
	created() {
		// start initial actions from Vuex Store to load Resource and Users
		this.setUsers();
		this.setResources();
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	min-height: 100vh;
	background: #9053c7;
	background: -webkit-linear-gradient(-135deg, #c850c0, #4158d0);
	background: -o-linear-gradient(-135deg, #c850c0, #4158d0);
	background: -moz-linear-gradient(-135deg, #c850c0, #4158d0);
	background: linear-gradient(-135deg, #c850c0, #4158d0);
	display: flex;
	display: -webkit-flex;
	display: -moz-box;
	display: -ms-flexbox;
	justify-content: center;
	align-items: center;
	padding: 40px;
}
</style>

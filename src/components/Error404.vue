<template>
	<div>
		<h1>404 Page</h1>
		<p>
			<router-link :to="{ name: 'Login' }" tag="span"
				>Login</router-link
			>
			To Enter The Website
		</p>
	</div>
</template>

<script>
export default {
	name: 'Error404',
};
</script>

<style scoped>
h1 {
	font-size: 10vw;
	text-align: center;
	color: white;
	font-family: 'Poppins', sans-serif;
}
p {
	font-size: 3vw;
	font-family: 'Poppins', sans-serif;
	font-weight: 300;
	color: white;
	text-align: center;
}
p span {
	cursor: pointer;
	color: #f5ead8;
}
</style>

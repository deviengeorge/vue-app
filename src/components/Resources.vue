<template>
	<div class="resources">
		<h1>Resources</h1>
		<button
			class="btn"
			@click="() => this.$router.push({ name: 'Users' })"
		>
			Users
		</button>
		<h4 v-if="err" class="error">
			There Is Something Wrong, Please Check Your Network
		</h4>
		<div class="cards">
			<div
				v-for="res in resources"
				v-bind:key="res.id"
				class="resource-card"
				@click="goToResource(res.id)"
			>
				<h2 class="card-heading">{{ res.name }}</h2>
				<h3 class="card-year">year: {{ res.year }}</h3>
				<h3 class="card-color">{{ res.color }}</h3>
				<h3 class="card-pantone">pantone: {{ res.pantone_value }}</h3>
			</div>
		</div>
	</div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
	name: 'Resources',
	data() {
		return {
			err: false,
			resources: [],
		};
	},

	created() {
		this.resources = this.getResources();
		if (this.resources.length === 0) {
			this.err = true;
		}
	},
	methods: {
		...mapGetters(['getResources']),
		goToResource(res_id) {
			this.$store.dispatch('setResource', res_id);
			// this.$router.push({ name: 'Resource', params: { id: res_id } });
		},
	},
};
</script>

<style scoped>
.resources {
	text-align: center;
	background: #fff;
	border-radius: 10px;
	padding: 50px 95px;
}

.resources h1 {
	font-size: 35px;
	font-family: 'Montserrat';
	font-weight: 500;
	margin-bottom: 50px;
}

button.btn {
	outline: none;
	border: none;
	background-color: #fafafa;
	padding: 12px 25px;
	color: black;
	font-family: 'Montserrat';
	font-size: 25px;
	font-weight: 500;
	text-align: left;
	justify-self: start;
	margin-bottom: 50px;
	border-radius: 10px;
	cursor: pointer;
}

.cards {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 10px;
}

.resource-card {
	background: #f3f3f3;
	grid-column: span 1;
	padding: 40px;
	border-radius: 10px;
	font-family: 'Poppins';
}

.resource-card * {
	font-family: 'Poppins';
	font-weight: 400;
}

.resource-card .card-heading {
	font-size: 30px;
	text-transform: capitalize;
	font-weight: 500;
}

.error {
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
	margin-top: 20px;
}

@media screen and (max-width: 650px) {
	.resources {
		padding: 50px 25px;
	}
	.resource-card {
		padding: 35px;
	}
	.cards {
		grid-template-columns: 1fr;
	}
}

@media screen and (max-width: 1000px) and (min-width: 650px) {
	.cards {
		grid-template-columns: repeat(2, 1fr);
	}

	.resource-card {
		padding: 20px;
	}

	.resources {
		padding: 50px 30px;
	}
}

@media screen and (min-width: 1000px) {
	.cards {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>

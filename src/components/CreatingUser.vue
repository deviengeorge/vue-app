<template>
	<div class="user">
		<h1>Creating A User</h1>
		<!-- user Cards -->
		<form class="user-card">
			<input
				type="text"
				name="first_name"
				v-model="first_name"
				placeholder="First Name"
			/>
			<input
				type="text"
				name="last_name"
				v-model="last_name"
				placeholder="Last Name"
			/>
			<input
				type="email"
				name="email"
				v-model="email"
				placeholder="Email"
			/>
			<button
				type="submit"
				@click.prevent="createUser"
				class="Create"
			>
				Create
			</button>
			<button
				type="button"
				@click.prevent="cancelUser"
				class="cancel"
			>
				Cancel
			</button>
		</form>
		<h4 v-if="err" class="error">
			Please Type All Information
		</h4>
	</div>
</template>

<script>
export default {
	name: 'CreatingUser',
	data() {
		return {
			err: false,
			first_name: '',
			last_name: '',
			email: '',
		};
	},
	methods: {
		// function to create user and send the information to the api and then go to users page
		createUser() {
			if (
				this.first_name !== '' &&
				this.last_name !== '' &&
				this.email !== ''
			) {
				this.$store.dispatch('createUser', {
					first_name: this.first_name,
					last_name: this.last_name,
					email: this.email,
				});
			} else {
				this.err = true;
			}
		},
		// function to cancel the Creation and go to users page
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

.user-card .Create {
	outline: none;
	border: none;
	color: black;
	background: #00e676;
	border-radius: 10px;
	font-size: 18px;
	padding: 10px 18px;
	margin: 10px 5px;
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
	margin: 10px 5px;
	cursor: pointer;
}

.error {
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
	margin-top: 20px;
}

@media screen and (max-width: 650px) {
	.user-card {
		padding: 0px;
	}
	.user {
		padding: 50px 25px;
	}
	.user h1 {
		padding: 0 70px;
	}
}
</style>

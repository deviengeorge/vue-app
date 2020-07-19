<template>
	<div class="users">
		<h1>Users</h1>
		<button class="btn" @click="createUser">+ Create</button>
		<button
			class="btn"
			@click="() => this.$router.push({ name: 'Resources' })"
		>
			Resources
		</button>
		<h4 v-if="err" class="error">
			There Is Something Wrong, Please Check Your Network
		</h4>

		<!-- Users Cards -->
		<div class="cards">
			<div
				class="user-card"
				v-for="user in this.users"
				:key="user.id"
			>
				<img
					class="avatar"
					:src="user.avatar"
					:alt="user.first_name"
				/>
				<h2 class="card-heading">
					{{ user.first_name }} {{ user.last_name }}
				</h2>
				<h3 class="card-email">{{ user.email }}</h3>
				<button class="update" @click="updateUser(user.id)">
					Update
				</button>
				<button class="delete" @click="deleteUser(user.id)">
					Delete
				</button>
			</div>
		</div>

		<!-- Pagination Pages -->
		<div class="pagination">
			<span
				class="page_num"
				v-for="num in this.pages"
				:key="num"
				@click="paginationCLicking(num)"
			>
				{{ num }}
			</span>
		</div>
	</div>
</template>

// ========================================================

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'Users',
	data() {
		return {
			err: false,
			pages: [],
			users: [],
			allUsers: [],
		};
	},
	created() {
		// get all users from the Vuex state and store it in allUsers
		this.allUsers = this.getUsers();

		// if there is no objects in allUsers that mean there is no data then show the error
		if (this.allUsers.length === 0) {
			this.err = true;
		}
	},

	// to watch if allUsers State changed then reRendering the pagination
	//  and recalculate number for every per page
	watch: {
		allUsers: function() {
			// algorithm to get the number of pages by divided the whole users by value of per page that is 6 per page
			this.pages = Math.ceil(this.allUsers.length / 6);

			// and then set an initial value by slicing from 0 to 6 ( 6 per page ) and set it in users state
			this.users = this.allUsers.slice(0, 6);
		},
	},
	methods: {
		// get actions and getters from Vuex store
		...mapGetters(['getUsers']),
		...mapActions(['deleteUser']),

		// change users when clicking on pagination buttons
		paginationCLicking(pageId) {
			// algorithm to calculate users in every page with custom per page number
			this.users = this.allUsers.slice((pageId - 1) * 6, pageId * 6);
		},

		// function to dispatch an setUser action to store user in the global state
		updateUser(userId) {
			this.$store.dispatch('setUser', userId);
		},

		// function to push the route to create user page
		createUser() {
			this.$router.push({ name: 'CreatingUser' });
		},
	},
};
</script>

// ===============================================================

<style scoped>
.users {
	text-align: center;
	background: #fff;
	border-radius: 10px;
	padding: 50px 95px;
}

.users h1 {
	font-size: 35px;
	font-family: 'Montserrat';
	font-weight: 500;
	margin-bottom: 50px;
}

.users button.btn {
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
	margin: 20px 5px;
	border-radius: 10px;
	cursor: pointer;
}

.cards {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 10px;
}

.user-card {
	background: #f3f3f3;
	grid-column: span 1;
	padding: 40px;
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
}

.user-card .card-heading {
	font-size: 30px;
	text-transform: capitalize;
	font-weight: 500;
}

.user-card .update {
	outline: none;
	border: none;
	color: black;
	background: #00e676;
	border-radius: 10px;
	font-size: 16px;
	padding: 5px 10px;
	margin: 10px 5px;
	cursor: pointer;
}

.user-card .delete {
	outline: none;
	border: none;
	color: white;
	background: #f03434;
	border-radius: 10px;
	font-size: 16px;
	padding: 5px 10px;
	margin: 10px 5px;
	cursor: pointer;
}

.error {
	font-family: 'Poppins', sans-serif;
	font-weight: 400;
	margin-top: 20px;
}

.pagination {
	margin-top: 50px;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.pagination .page_num {
	cursor: pointer;
	border-radius: 5px;
	padding: 15px;
	margin: 0 5px;
	background-color: #f5f5f5;
	font-family: 'Poppins';
	font-size: 20px;
	font-weight: 500;
}

/* Media Query */
@media screen and (max-width: 650px) {
	.users {
		padding: 50px 25px;
	}
	.user-card {
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
	.user-card {
		padding: 20px;
	}
	.users {
		padding: 50px 30px;
	}
}

@media screen and (min-width: 1000px) {
	.cards {
		grid-template-columns: repeat(3, 1fr);
	}
}
</style>

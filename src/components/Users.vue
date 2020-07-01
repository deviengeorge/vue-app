<template>
  <div class="users">
    <h1>Users</h1>
    <button class="btn" @click="createUser">+ Create</button>
    <button class="btn" @click="() => this.$router.push({ name: 'Resources' })">
      Resources
    </button>
    <h4 v-if="err" class="error">
      There Is Something Wrong, Please Check Your Network
    </h4>

    <!-- Users Cards -->
    <div class="cards">
      <div class="user-card" v-for="user in this.users" :key="user.id">
        <img class="avatar" :src="user.avatar" :alt="user.first_name" />
        <h2 class="card-heading">{{ user.first_name }} {{ user.last_name }}</h2>
        <h3 class="card-email">{{ user.email }}</h3>
        <button class="update" @click="updateUser(user.id)">Update</button>
        <button class="delete" @click="deleteUser(user.id)">Delete</button>
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

<script>
import axios from "axios";

export default {
  name: "Users",
  data() {
    return {
      err: false,
      pages: [],
      users: [],
    };
  },
  computed: {
    token() {
      return this.$store.state.tokenKey;
    },
  },
  created() {
    if (this.token == "") {
      this.$router.push({ name: "Login", params: { tokenErr: true } });
    } else {
      // Function To Get Data Of Page One As Initial Data
      axios
        .get("https://reqres.in/api/users?page=1")
        .then((res) => {
          // this.pages = parseInt(res.data.total_pages);
          this.users = res.data.data;
          console.log(this.users);
          // Looping the pagination numbers
          for (let i = 1; i <= parseInt(res.data.total_pages); i++) {
            this.pages = [...this.pages, i];
          }
        })
        .catch(() => {
          this.err = true;
        });
    }
  },
  methods: {
    // Function To Get Data Page Every Time We Click On page_num Span
    paginationCLicking(pageId) {
      axios
        .get(`https://reqres.in/api/users?page=${pageId}`)
        .then((res) => {
          this.users = res.data.data;
          console.log(this.users);
        })
        .catch(() => {
          this.err = true;
        });
    },
    // Function To Delete User When Clicking On Button Delete
    deleteUser(userId) {
      axios.delete(`https://reqres.in/api/users/${userId}`).then(() => {
        this.users = this.users.filter((user) => user.id !== userId);
      });
    },
    updateUser(userId) {
      this.$router.push({ name: "User", params: { id: userId } });
    },
    createUser() {
      this.$router.push({ name: "CreatingUser" });
    },
  },
};
</script>

<style scoped>
.users {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  padding: 50px 95px;
}

.users h1 {
  font-size: 35px;
  font-family: "Montserrat";
  font-weight: 500;
  margin-bottom: 50px;
}

.users button.btn {
  outline: none;
  border: none;
  background-color: #fafafa;
  padding: 12px 25px;
  color: black;
  font-family: "Montserrat";
  font-size: 25px;
  font-weight: 500;
  text-align: left;
  justify-self: start;
  margin-bottom: 50px;
  margin-left: 20px;
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
  font-family: "Poppins";
}

.user-card * {
  font-family: "Poppins";
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
  margin: 20px 10px 0px 0px;
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
  margin: 20px 0px 0px 10px;
  cursor: pointer;
}

.error {
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins";
  font-size: 20px;
  font-weight: 500;
}

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
}

@media screen and (min-width: 1000px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

<template>
  <div class="user">
    <h1>User {{ this.id }}</h1>
    <h4 v-if="err" class="error">
      There Is Something Wrong, Please Check Your Network
    </h4>

    <!-- user Cards -->
    <form class="user-card">
      <img class="avatar" :src="avatar" :alt="first_name" />
      <input type="text" name="first_name" v-model="first_name" />
      <input type="text" name="last_name" v-model="last_name" />
      <input type="email" name="email" v-model="email" />
      <button type="submit" @click="updateUser" class="update">Update</button>
      <button type="button" @click="cancelUser" class="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      err: false,
      id: this.$route.params.id,
      avatar: "",
      first_name: "",
      last_name: "",
      email: "",
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
        .get(`https://reqres.in/api/users/${this.id}`)
        .then((res) => {
          console.log(res.data.data);
          this.avatar = res.data.data.avatar;
          this.first_name = res.data.data.first_name;
          this.last_name = res.data.data.last_name;
          this.email = res.data.data.email;
        })
        .catch(() => {
          this.err = true;
        });
    }
  },
  methods: {
    // function to update user and send the information to the api and then go to users page
    updateUser(e) {
      e.preventDefault();
      axios
        .patch(`https://reqres.in/api/users/${this.id}`, {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
        })
        .then(() => {
          this.$router.push({ name: "Users" });
        })
        .catch(() => {
          this.err = true;
        });
    },
    // function to cancel the edit and go to users page
    cancelUser(e) {
      e.preventDefault();
      this.$router.push({ name: "Users" });
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
  font-family: "Montserrat";
  font-weight: 500;
  margin-bottom: 50px;
}

.user-card {
  background: #fff;
  padding: 0;
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
  margin-bottom: 50px;
}

.user-card input {
  outline: none;
  border: none;
  font-family: "Poppins", sans-serif;
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
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
}

@media screen and (max-width: 650px) {
  .user-card {
    padding: 35px;
  }
}
</style>

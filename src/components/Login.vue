<template>
  <form @submit="handleSubmit">
    <span class="title">Member Login</span>
    <input type="text" v-model="email" name="email" placeholder="Email" />
    <input
      type="password"
      v-model="password"
      name="pass"
      placeholder="Password"
    />
    <button class="btn" type="submit">Login</button>
    <!-- Showing error when type email or password wrong -->
    <h4 v-if="err" class="error">
      There is something wrong. Check Email, Password
    </h4>
    <!-- Showing error when trying to excess the website without login or register -->
    <h4 v-if="this.$route.params.tokenErr" class="error">
      Please Login First to Enter The Website
    </h4>
    <router-link class="register" to="/reg">
      Create your Account
    </router-link>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      err: false,
      email: "",
      password: "",
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      axios
        .post("https://reqres.in/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          // Go to Resource Page
          console.log(res.data.token);
          this.$store.commit("edit", { amount: res.data.token });
          this.$router.push("resources");
        })
        .catch(() => {
          this.err = true;
        });
    },
  },
};
</script>

<style scoped>
form {
  background: #fff;
  border-radius: 10px;
  padding: 80px 95px 30px 95px;
  text-align: center;
}

form .title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #333333;
  width: 100%;
  display: block;
  padding-bottom: 54px;
}

form input {
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

form .btn {
  font-size: 15px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  letter-spacing: 1.4px;
  background: #57b846;
  color: #fff;
  text-transform: uppercase;
  height: 50px;
  width: 100%;
  border-radius: 25px;
  padding: 0 25px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -webkit-transition: all 0.4s;

  outline: none !important;
  border: none;
}

form .register {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  color: #666666;
  text-decoration: none;
  transition: all 0.4s;
  display: block;
  margin-top: 100px;
  cursor: pointer;
}

form .error {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
}

form .register:hover {
  color: #57b846;
}
@media screen and (max-width: 650px) {
  form {
    margin: 0 20px;
    padding: 50px 20px 25px 20px;
  }
}
</style>

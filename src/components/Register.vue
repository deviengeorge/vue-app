<template>
  <form @submit="handleSubmit">
    <h1 class="title">Member Register</h1>
    <input type="text" name="email" placeholder="Email" v-model="email" />
    <input
      type="password"
      v-model="password"
      name="pass"
      placeholder="Password"
    />
    <input
      type="password"
      v-model="confPassword"
      name="pass"
      placeholder="Confirm Password"
    />
    <button class="btn">Register</button>
    <h4 v-if="err" class="error">There is something wrong</h4>
    <h4 v-if="confirmErr" class="error">Password Did't Match</h4>
    <router-link class="login" to="/login">Have An Account?</router-link>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      err: false,
      confirmErr: false,
      email: "",
      password: "",
      confPassword: "",
    };
  },
  methods: {
    handleSubmit(e) {
      // let error;
      e.preventDefault();
      if (this.confPassword === this.password) {
        axios
          .post("https://reqres.in/api/register", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            // Go to Resource Page
            this.$router.push("resources");
          })
          .catch(() => {
            this.err = true;
            this.confirmErr = false;
          });
      } else {
        this.err = false;
        this.confirmErr = true;
      }
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

form .error {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
}

form .login {
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

form .login:hover {
  color: #57b846;
}
</style>

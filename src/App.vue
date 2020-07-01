<template>
  <div id="app">
    <!-- <Login /> -->
    <!-- <router-link to="/reg">reg</router-link> -->
    <!-- <router-link to="/login">Login</router-link> -->
    <router-view>
      <Login />
    </router-view>
  </div>
</template>

<script>
// import Login from "./components/Login";
export default {
  name: "App",
  // components: {
  //   Login,
  // },
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

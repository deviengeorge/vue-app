import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";
import Resources from "./components/Resources";
import Resource from "./components/Resource";
import Users from "./components/Users";
import User from "./components/User";
import CreatingUser from "./components/CreatingUser";
import Error404 from "./components/Error404";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/reg",
      name: "Register",
      component: Register,
    },
    {
      path: "/resource/:id",
      name: "Resource",
      component: Resource,
    },
    {
      path: "/resources",
      name: "Resources",
      component: Resources,
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
    },
    {
      path: "/user/:id",
      name: "User",
      component: User,
    },
    {
      path: "/create",
      name: "CreatingUser",
      component: CreatingUser,
    },
    {
      path: "*",
      component: Error404,
    },
  ],
});

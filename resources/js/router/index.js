import Vue from "vue";
import VueRouter from "vue-router";
import VueSession from "vue-session";
import VueCookies from "vue-cookies";

Vue.use(VueCookies);
Vue.use(VueRouter);
Vue.use(VueSession);
import DashBoard from "../pages/Dashboard";
import Welcome from "../pages/Welcome";
import VerifyEmail from "../pages/auth/VerifyEmail";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ForgotPasswordEmail from "../pages/auth/ForgotPasswordEmail";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

Vue.$cookies.config("7d");
const routes = [
  {
    path: "/",
    component: DashBoard,
    name: "dashboard",
  },
  {
    path: "/asd",
    component: DashBoard,
    name: "asd",
  },
  {
    path: "/welcome",
    component: Welcome,
    name: "welcome",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/register",
    component: Register,
    name: "register",
  },

  {
    name: "verify-email",
    path: "/email/verify",
    component: VerifyEmail,
  },
  {
    name: "forgot-password",
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    name: "password-reset",
    path: "/profile/forgot-password-reset/:token/:email",
    component: ForgotPasswordEmail,
  },
  {
    path: "*",
    component: DashBoard,
  },
];

export default new VueRouter({
  mode: "history",
  routes,
});

<template>
  <div class="container mt-5">
    <!--class="d-flex justify-content-center align-items-center"-->
    <div class="bg-dark p-5 mx-auto w-50">
      <h1 class="text-center text-primary">Register</h1>
      <p v-if="errors.length" class="text-white">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <form class="text-white">
        <div class="form-group">
          <label for="email ">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="name"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword"> Confirm Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password_confirmation"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label text-white" for="exampleCheck1"
            >Check me out</label
          >
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-primary" @click="register">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: "Register",
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    async register() {
      this.checkForm();
      if(this.errors.length>0){
        return false;
      }

      // API for auth/register
      await axios
        .post(
          "api/auth/register/",
          {
            email: this.email,
            name: this.name,
            password: this.password,
            password_confirmation: this.password_confirmation,
          },
          {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        )
        .then((response) => {
          Cookies.set('token', response.data.access_token, { expires: 365 })
          this.$session.set('jwt', response.data.access_token)
          this.$router.push({ name: `verify-email`, params: { query: response.data.access_token} });
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    },

    checkForm: function (e) {
      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      }
      if (!this.name) {
        this.errors.push('Name required.');
      }
      if (!this.password) {
        this.errors.push('Password required.');
      }
      if (!this.password_confirmation) this.errors.push('Confirm Password required.');

      if(this.password!==this.password_confirmation) this.errors.push('Password and Confirm Password doesn\'t match');

    }
  },
};
</script>

<style scoped></style>

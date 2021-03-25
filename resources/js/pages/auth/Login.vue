<template>
  <div class="container mt-5">
    <!--class="d-flex justify-content-center align-items-center"-->
    <div class="bg-dark p-5 mx-auto w-50">
      <h1 class="text-center text-primary">Login</h1>
      <p v-if="errors.length" class="text-white">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          >
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1"
            >Check me out</label
          >
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-primary" @click="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      email: "",
      password: "",
    };
  },
  methods: {
    // API for auth/login
    async login() {
      await axios
        .post(
          "api/auth/login/",
          {
            email: this.email,
            password: this.password,
          },
          {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        )
        .then((response) => {
          this.$router.push({name: `welcome`})
        })
        .catch((error) => {
          console.error(error.response.data.message);
        });
    },
  },
};
</script>
<style scoped></style>

<template>
  <div>
    <div class="mt-2 alert alert-warning" role="alert">
      Email verification is taking place.
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  async mounted() {
    const token = Cookies.get("token");
    const { queryURL } = this.$route.query;
    if(!token) return 0;
    await axios
      .post(queryURL, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "X-CSRF-TOKEN",
        "Authorization" : "Bearer" + token
      },
      )
      .then((response) => {
        if(response.data)
        this.$router.push({name: "welcome"})
      })
      .catch((x) => {
        console.log(x)
      });
  },
};
</script>

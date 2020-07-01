<template>
  <div>
    <div class="resource-card">
      <h4 v-if="err" class="error">
        There Is Something Wrong, Please Check Your Network
      </h4>
      <Fragment v-else>
        <h2 class="card-heading">{{ this.resource.name }}</h2>
        <h3 class="card-year">year: {{ this.resource.year }}</h3>
        <h3 class="card-color">{{ this.resource.color }}</h3>
        <h3 class="card-pantone">pantone: {{ this.resource.pantone_value }}</h3>
        <button
          class="back"
          @click="() => this.$router.push({ name: 'Resources' })"
        >
          Back
        </button>
      </Fragment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Fragment } from "vue-fragment";

export default {
  name: "Resource",
  components: {
    Fragment,
  },
  data() {
    return {
      err: false,
      id: this.$route.params.id,
      resource: [],
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
      axios
        .get(`https://reqres.in/api/list/${this.id}`)
        .then((res) => {
          this.resource = res.data.data;
          // console.log(res.data.data);
          console.log(this.resource);
        })
        .catch(() => {
          this.err = true;
        });
    }
  },
};
</script>

<style scoped>
.resource {
  text-align: center;
  background: #fff;
  border-radius: 10px;
  padding: 50px 95px;
}

.resource h1 {
  font-size: 35px;
  font-family: "Montserrat";
  font-weight: 500;
  margin-bottom: 50px;
}

.resource-card {
  background: #fff;
  text-align: center;
  grid-column: span 1;
  padding: 80px;
  border-radius: 10px;
  font-family: "Poppins";
}

.resource-card * {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 26px;
}

.resource-card .card-heading {
  font-size: 40px;
  text-transform: capitalize;
  font-weight: 400;
}

.error {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  margin-top: 20px;
}

.back {
  margin-top: 50px;
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

@media screen and (max-width: 500px) {
  .resource-card {
    padding: 35px;
  }
}
</style>

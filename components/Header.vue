<template>
  <client-only>
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <router-link tag="a" class="navbar-brand" to="/" exact
              >Bike Renting</router-link
            >
          </li>
          <!-- <li><router-link  tag="a" class="navbar-brand" to="page" exact>About us </router-link></li>
                 <li><router-link tag="a" class="navbar-brand" to="/page" exact>Bike a rent</router-link></li>
                  <li><router-link tag="a" class="navbar-brand" to="/page" exact>Our product</router-link></li>
                   <li><router-link tag="a" class="navbar-brand" to="/page" exact>login</router-link></li>
                   <li><router-link tag="a" class="navbar-brand" to="/page" exact>Coupons</router-link></li> -->
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul class="uk-navbar-nav">
          <li v-for="page in pages" :key="page.id">
            <nuxt-link
              :to="{ name: 'page-slug', params: { slug: page.slug } }"
              tag="a"
            >
              {{ page.title }}
            </nuxt-link>
          </li>
        </ul>
      </div>
       <div id="navbarBasicExample" class="navbar-menu">
 <div v-if="isAuthenticated" class="navbar-start">
 <div class="navbar-item has-dropdown is-hoverable">
 <a class="navbar-link">
 {{ loggedInUser.username }}
 </a>

 <div class="navbar-dropdown">
 <a class="navbar-item" href="/profile">My Profile</a>
 <hr class="navbar-divider" />
 <a class="navbar-item" @click="logout">Logout</a>
 </div>
 </div>
 </div>
       </div>
      <div v-if="!isAuthenticated" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link class="button is-primary" to="/register">
              <strong>Register</strong>
            </nuxt-link>
            <nuxt-link class="button is-light" to="/login">
              Log in
            </nuxt-link>
          </div>
        </div>
      </div>
    </nav>
  </client-only>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  
//   computed: {
//     ...mapGetters(["isAuthenticated", "loggedInUser"])
//   },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  },
  mounted() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener("click", () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        });
      });
    }
  },
    props: {
    pages: {
      type: Array
    }
  }

};
</script>
<style scoped>
.navbar-brand {
  font-style: italic;
  font-size: 15px;

}
.uk-navbar-right{
  margin-left: 868px;
}
</style>
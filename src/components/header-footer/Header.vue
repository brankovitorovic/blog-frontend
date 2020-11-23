<template>
    <div class="header">
       
        <router-link to="/" class="logo">CompanyLogo</router-link>

        <router-link id="home" to="/">Home</router-link>
        <router-link to="/about">About</router-link>

        <div class="header-right">
            <span v-if="isLogged">
                <label>Hi {{username}} </label>
                <router-link to="/addPost">Add post </router-link> 
                <router-link to="/profil"> Profil </router-link> 
                <a @click="logout">Logout</a>
            </span>
            <span v-else>
                <router-link to="/signIn">Sign in</router-link>
            </span>

        </div>  
        
    </div>
</template>

<script>
export default {
    computed:{
        isLogged(){
            return this.$store.getters.isLoggedIn;
        },
        username(){
            return this.$store.getters.username;
        }
    },
    methods:{
        logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          document.getElementById("home").click();
        })
      }
    }
}
</script>

<style scoped>

.header {
  overflow: hidden;
  background-color: #8da9e2;
  padding: 20px 10px;
  border-radius: 20px;
  margin-bottom: 3%;
}

.header a,label {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  font-size: 20px;
  line-height: 25px;
  border-radius: 4px;
}

.header a:hover {
  background-color: #f1f1f1;
  color: black;
}

.header a.active {
  background-color: dodgerblue;
  color: white;
}

.header-right {
  float: right;
}

</style>
<template>
  <div class="app wrapper">
    
    <Header></Header>

    <router-view/>
          
    <Footer></Footer>

  </div>
</template>

<script>
import Header from './components/header-footer/Header';
import Footer from './components/header-footer/Footer'
export default {
  components:{
    Header,
    Footer
  },
  created() {
    this.$store.dispatch('checkLoggedUser');
  } 
}
</script>

<style>
.wrapper{
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    color: #111;
}


</style>

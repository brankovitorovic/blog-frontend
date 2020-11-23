<template>
    <div class="card">
      <h1>{{post.title}}</h1>
      <h4>by {{post.creator.username.toUpperCase()}}, {{post.dateCreated}}</h4>
      <h5 class="category">#{{post.category}}</h5>
      <img class="img" :src=post.url>
      <h3>{{subStringText(post.body)}}</h3>
      <button @click="readArticle(post)"> Read </button>
    </div>
</template>

<script>
export default {
    props: ['post'],
    methods: {
      subStringText(text){
        var sentances = text.split('.');
        var res = '';
        
        for(var i = 0; i < 6; i++){
          res += sentances[i]+'.';
        }
        return res;
      },
      readArticle(post){
        this.$router.push({ name: 'Article', params: {article: post }}) 
      }
    }
   
}
</script>

<style scoped>

.category{
  margin-bottom: 3px;
}

.card {
  background-color: #8da9e2;
  padding: 20px;
  text-align: center;
  margin-bottom: 2%;
  border-radius: 20px;
  width: 90%;
}

img {
    float: left;
    width:  100%;
    height: 200px;
    margin-bottom: 20px;
}
button {
  background-color: #dd2d20; 
  border: 1px solid #dd2d20;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

button:hover {
  background-color: #8da9e2;
  color: #dd2d20;
  border: 1px solid #dd2d20;
}

</style>
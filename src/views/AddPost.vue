<template>

    <div class="form">
        <h2>Add post</h2>
        <br>
        <h3>Title:</h3>
        <input type="text" v-model="post.title"> <br>
        
        <select v-model="post.category">
            <option disabled value="">Please select category</option>
            <option v-for="c in categories" v-bind:key="c"> {{capitalizeFirstLetter(c)}} </option>
        </select>
                    <br>
       <h3>Choose image:</h3>
        <input type="file" accept="image/*" v-on:change="fileChooser($event)">
                <br>

        <h3>Text for post:</h3>
        <textarea v-model="post.body" rows="10" cols="80"></textarea>
        <br>

        <button @click="savePost">Save</button>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    data: function(){
        return { 
            
            post: {
                frontId: 0,
                title: '',
                body: '',
                url: '',
                category: ''
                },
                categories: [],
            
        }
    },
    created:
        function() {
        this.$store.dispatch('loadCategories')
        .then( () => this.categories = this.$store.getters.categories)
        .catch( err => console.log(err));
    },
    methods: {
        savePost(){
            if(this.post.category == ''){
                alert("Please choose category for post.");
                return;
            }
            if(this.post.title == ''){
                alert("Please choose the title for post.");
                return;
            }
            if(this.post.body == ''){
                alert("Please write a body of post.");
                return;
            }
            if(this.post.url == ''){
                alert("Please choose photo for post.");
                return;
            }
            this.post.category = this.post.category.toUpperCase();
            axios({url:'/post/save',data:this.post,method:"POST"})
            .then( ()  => {
                this.$store.dispatch('loadPosts');
                this.$router.push('/')
            })
            .catch( err => {
                console.log(err)
            })

        },
        fileChooser(event){
            if(event.target.files[0] == undefined){
               return;
            }
            console.log(event.target.files[0].name); // + C:\Users\Vitorovic\Desktop\photos dok ne proradi i prebacivanje slika, pazi na /
            this.post.url = "C:/Users/Vitorovic/Desktop/photos/" + event.target.files[0].name; 
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
    }


}
</script>

<style scoped>

h2 {
    margin-bottom: 0px;
}

select{
    margin-top: 25px;
}

.form{
    text-align: center;
}

button {
  background-color: #dd2d20; 
  border: 1px solid #dd2d20;
  color: white;
  padding: 12px 28px;
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
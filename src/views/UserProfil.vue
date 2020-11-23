<template>
    <div class="form">
        
        <div class="profil">
            <div class="center">    
                <h2>Profil</h2>
                <br>
                <div class="goRight">     
                    <label for="username">Username:</label>
                    <input type="text" v-model="user.username"> <br>
                    <label for="name">Name:</label>
                    <input type="text" v-model="user.name"> <br>
                    <label for="email">Email:</label>
                    <input type="text" v-model="user.email"> <br>
                    <label for="password">Password:</label>
                    <input type="text" id="password" placeholder="New password..."> <br>
                </div>
                <button class="save" @click="saveUser">Save</button>
            </div>
        </div>
    
        <div class="posts">
            <h2>Posts</h2>
            <ul>
                <li v-if="!posts.length">No posts found</li>
                <div v-for="post in posts" v-bind:key="post.frontId">
                    <li>
                        {{post.title}} 
                    </li>    
                    <button @click="deletePost(post.frontId)">Delete</button> 
                </div>
            </ul>
        </div>

    </div>

</template>

<script>
import axios from 'axios'

    export default{
        name: "userProfil",
        data() {
            return {
                user: {
                    frontId: 0,
                    username: '',
                    name: '',
                    email: '',
                    password: ''
                },
                posts: []
            }
        },
        created: 
            function () {
                this.$store.dispatch('loadUser')
                .then( () => this.user = this.$store.getters.user)
                .catch(err => console.log(err));
            this.searchByUsername();
        },
        methods: {
            saveUser(){
                const password = document.getElementById("password").value;
                
                if(password != ''){
                    this.user.password = password;
                }

                 
                this.$store.dispatch('saveUser', this.user)
                .then(() => this.$router.push('/'))
                .catch(err => console.log(err));
            },
            searchByUsername(){
            
                axios({url:"/post/all/user=" + this.$store.getters.username,method:"GET"})
                .then( resp => {
                    this.posts = resp.data;
                })
                .catch( err => {
                    if(err.response.status == 400){
                        this.posts = [];
                    }
                })
            },
            deletePost(id){
                axios({url: "/post/delete/id=" + id, method:"GET"})
                .then( () => {
                    alert("Successfuly deleted post.");
                    this.posts = this.posts.filter(p => p.frontId != id);
                    
                })
                .catch(err => console.log(err))
            }
        }


    }


</script>

<style scoped>

.form {
    display: flex;
    justify-content: space-between;
}

.profil {
    width: 50%;    
}

.posts {
    width: 50%;
    text-align: center;
}

label {
    margin: 15px;
}

input {
    margin: 15px;
}

.center {
    width: 50%;
    margin: 0 auto;
    text-align: center;
}

.goRight {
    text-align: right;
}

ul {
    list-style-type: none;
    padding: 20px;
}

ul div{
    display: flex;
    justify-content: space-between;
    margin: 20px;
    border: 2px solid #8da9e2;
    border-radius: 4px;
    padding: 20px;
}

ul div li {
    text-align: left;
    width: 85%;
}

ul div button {
    width: 15%;
}


</style>
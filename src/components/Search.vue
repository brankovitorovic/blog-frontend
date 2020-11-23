<template>
    <div>

        <h3>Search for blogs</h3>
        
        <span>
            <h4>Search by categories:</h4> 
            <select v-model="selectedCategory">
                <option disabled value="">Please select category</option>
                <option v-for="c in categories" v-bind:key="c"> {{c}} </option>
            </select>
            <button @click="searchByCategory" >Search</button>
        </span>
      
        <span>
            <h4>Search by name:</h4>
            <input type="text" v-model="searchName">
            <button @click="searchByTitle">Search</button>
        </span>

        <h4>Writers:</h4>
        <div class="writers">
            <p v-bind:key="writer" v-for="writer in writers">
                <label @click="searchByUsername(writer)">{{writer}}</label>
            </p>
        </div>

        <button @click="resetSearch" >Reset filters</button>

    </div>
</template>

<script>
import axios from 'axios';

export default {

    data(){
        return {
            categories: [],
            selectedCategory: '',
            searchName: '',
            writers: []
        }
    },
    created:
        function() {
            this.$store.dispatch('loadCategories')
            .then( () => this.categories = this.$store.getters.categories)
            .catch( err => console.log(err));
            axios({url:'/post/all/writers',methods:"GET"})
            .then( resp => {
                this.writers = resp.data;
            })
            .catch( err => console.log(err));
    },
    methods: {
        searchByCategory(){
            if(this.selectedCategory == ''){
                alert("Please choose category for search.");
                return;
            }

            axios({url:'/post/all/category=' + this.selectedCategory,methods: "GET"})
            .then( resp => {
                this.$store.dispatch('updatePosts',resp.data);

            })
            .catch( err => {
                console.log(err);
            })

        },
        searchByTitle(){
            if(this.searchName == ''){
                alert("Please type part or hole name of post to search.");
            }

            axios({url:"/post/all",methods:"GET"})
            .then(resp => {
                var posts = resp.data;
                const res = posts.filter(post => {
                    const title = post.title.toLowerCase() + '';
                    return title.includes(this.searchName.toLowerCase());
                });
                this.$store.dispatch('updatePosts',res);
            })
            .catch( err => console.log(err));
        },
        searchByUsername(writer){
            
            axios({url:"/post/all/user=" + writer,method:"GET"})
            .then( resp => {
                this.$store.dispatch('updatePosts',resp.data);
            })
            .catch( err => console.log(err))


        },
        resetSearch(){
            this.selectedCategory = '';
            this.searchName = '';
            this.$store.dispatch('loadPosts');
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
    }
}
</script>

<style scoped>


div {
    background-color: #8da9e2;
    border-radius: 20px;
    padding: 15px;
    text-align: center;
}
h3 {
    margin-bottom: 25px;
}
h4 {
    margin: 10px;
    margin-top: 20px;
}
span button {
    margin-left: 10px;
}



select{
    margin: 5px 0 5px 0;
}
.writers {
    display: grid;
    grid-template-columns: auto auto auto;
    padding-top: 0;
}

p {
    padding: 10px;
    margin: 0px;
    text-align: center;
}
p label {
    cursor: pointer;
}

</style>
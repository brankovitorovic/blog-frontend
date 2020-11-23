<template>
    <div class="row">

        <div class="left_column">
            
            <PostCard v-for="post in posts" v-bind:key="post.frontId" v-bind:post="post"></PostCard>

        </div>

        <div class="right_column">

            <Search></Search>

        </div>



    </div>
</template>

<script>
import PostCard from './PostCard'
import Search from './Search'
import { mapGetters } from 'vuex'

export default {
    
    created() {
            this.$store.dispatch('loadPosts')
            //.then( () => this.posts = this.$store.getters.posts);
    },
    computed:{
        ...mapGetters([
            'posts',
        ]),
    },
    components: {
        PostCard,
        Search
    }
}
</script>

<style scoped>

.left_column {
  float: left;

}

.right_column {
  float: left;
  
}

.row {
    display: flex;
    justify-content: space-between;
}
</style>
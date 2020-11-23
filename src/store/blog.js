import axios from 'axios'

export default{
  state:{
        status: '',
        posts: [],
        categories :  []
    },

    mutations: {
        categories_success(state, categories){ 
            state.status = 'success';
            state.categories = categories;
        },
        post_error(state){
            state.status = 'error'
        },
        load_posts(state,posts){
            state.posts = posts;
        }
    },

    actions: {
        loadCategories({commit}){
            return new Promise( (resolve,reject) => {
                axios({url: '/post/all/categories',method: 'GET'})
                .then( resp => {
                    commit('categories_success',resp.data);
                    resolve(resp);
                })
                .catch( err => {
                    commit('post_error');
                    reject(err);
                })
            })
        },
        loadPosts({commit}){
            return new Promise( (resolve,reject) => {
                axios({url:'/post/all',method: "GET"})
                .then(resp => {
                    commit('load_posts',resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit('post_error');
                    reject(err);
                })
            })
        },
        updatePosts({commit},posts){
            commit('load_posts',posts);
        }
        
    },

    getters: {
        posts(state){
            return state.posts;
        },
        categories(state){
            return state.categories;
        } 
}
}
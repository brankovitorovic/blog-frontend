import axios from 'axios'


export default {
    state:{
        status: '',
        user:  {}
    },

    mutations: {
        user_success(state, user){ 
            state.status = 'success'
            state.user = user
        },
        user_error(state){
            state.status = 'error'
        },
    },

    actions: {
        saveUser({commit}, user){
            return new Promise((resolve, reject) => { 
                axios({url: 'user/update/existingId=' + user.frontId, data: user, method: 'POST' })
                .then(resp => {
                   commit("auth_success",resp.data,{root:true}); // root:true enable to commit to auth.js
                   resolve(resp)
                })
                .catch(err => {
                    commit("user_error")
                    reject(err)
                });
            });
        },
        loadUser({commit}){
            return new Promise( (resolve,reject) => {
                axios.get('user/username=' + this.getters.username) // we use getter from another module 
                .then(resp => {
                    commit("user_success",resp.data);
                    resolve(resp);
                })
                .catch(err => {
                    commit("user_error");
                    reject(err);
                })

            });
        }
    },

    getters: {
      user(state){
          return state.user;
      }
    }
}
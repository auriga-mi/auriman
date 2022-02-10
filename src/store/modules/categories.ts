const storeCategories = {

    namespaced: true,
    
    state: {
  
      categories: [
        {
            id: 1,
            name: 'Graphic Design'
        },
        {
            id: 2,
            name: 'Video Editing'
        },
        {
            id: 3,
            name: 'Programming'
        }
      ],
  
    },
    
    getters: {
  
    },
    
    mutations: {
  
      SET_CATEGORY(state, payload) {
        state.applications.push(payload)
      }
      
    },
    
    actions: {
  
      addItem(context, payload) {
        context.commit('SET_CATEGORY', payload)
      }
      
    }
  
  }
  
  export default storeCategories
const storeCategories = {

    namespaced: true,
    
    state: {
  
      nextId: 1,
      categories: []
  
    },
    
    getters: {
  
    },
    
    mutations: {
  
      SET_CATEGORY(state, payload) {
        state.categories.push(payload)
      }
      
    },
    
    actions: {
  
      addItem(context, payload) {
        context.commit('SET_CATEGORY', payload)
      }
      
    }
  
  }
  
  export default storeCategories
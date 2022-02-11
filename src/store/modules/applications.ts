const storeApplications = {

  namespaced: true,
  
  state: {

    nextId: 1,
    applications: [],

  },
  
  getters: {

  },
  
  mutations: {

    SET_APPLICATION(state, payload) {
      state.applications.push(payload)
      state.nextId++
    },

    EDIT_APPLICATION(state, payload) { 
      console.log(payload[0])
      console.log(payload[1])
      state.applications.splice(payload[0], 1, payload[1])
    },

    REMOVE_APPLICATION(state, payload) { 
      state.applications.splice(payload, 1)
    },

    RESET_ALL_APPLICATIONS(state) {
      state.applications = []
    }
    
  },
  
  actions: {

    addItem(context, payload) {
      context.commit('SET_APPLICATION', payload)
    },

    getItem({state}, payload) {
      return state.applications.find(x => x.id === payload)
    },    

    editItem({state, commit}, payload) {
      const index = state.applications.findIndex(x => x.id === payload.id)
      console.log(index)
      console.log(payload)
      commit('EDIT_APPLICATION', [index, payload])
    },

    removeItem({state, commit}, payload) {
      const index = state.applications.findIndex(x => x.id === payload)
      commit('REMOVE_APPLICATION', index)
    },

    resetAllItems(context) {
      context.commit('RESET_ALL_APPLICATIONS')
    }
    
  }

}

export default storeApplications
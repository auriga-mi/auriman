import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import importedModules from './modules'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    
    modules: importedModules,
    plugins: [vuexLocal.plugin]

});

export default store
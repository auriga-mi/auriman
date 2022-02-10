import Vuex from 'vuex'
import importedModules from './modules'

const store = new Vuex.Store({
    
    modules: importedModules,

});

export default store
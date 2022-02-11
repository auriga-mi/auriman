<template>
<div>

    <transition leave-active-class="duration-300">

      <div v-show="show_modal" class="fixed inset-0 z-30">

        <div v-show="show_modal" @click="showModal()" class="bg-filter bg-white opacity-25 fixed inset-0 w-full h-full z-20">
        </div>

        <main class="flex flex-col items-center justify-center h-full w-full">
            <transition name="fade-up-down">
                <div v-show="show_modal" class="modal-wrapper inline-block flex items-center z-30">
                    <div class="modal max-w-md mx-auto xl:max-w-5xl lg:max-w-5xl md:max-w-2xl bg-white max-h-screen shadow-lg flex-row rounded-md relative">

                        <div class="modal-header p-5 bg-gray-800 text-black rounded-t">
                            <h5 class="text-white text-2xl uppercase">{{ msg }}</h5>
                        </div>
                        <div class="modal-body p-5 w-full h-full overflow-y-auto justify-center">
                            <input ref="appId" class="hidden" type="text" />
                            <div class="grid grid-cols-2 mt-5 mx-7">
                                <div class="grid grid-cols-1 mr-3">
                                    <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Application name</label>
                                    <input ref="appNameInput" class="py-2 px-3 rounded-md border-2 border-gray-500 mt-1 focus:outline-none focus:border-gray-800" type="text" placeholder="Application name" />
                                </div>

                                <div class="grid grid-cols-1 ml-3">
                                    <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Category</label>
                                    <select ref="categoryInput" class="py-2 px-3 rounded-md border-2 border-gray-500 mt-1 focus:outline-none focus:border-gray-800">
                                        <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 mt-5 mx-7">
                                <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Application or Website URL</label>
                                <div class="grid grid-cols-3">
                                    <div class="text-right col-span-2">
                                        <input ref="appUrlInput" class="py-2 px-3 w-full rounded-l-md border-2 border-gray-500 focus:outline-none focus:border-gray-800" placeholder="Copy an URL or select the application with the Choose button..." type="text" />
                                    </div>                                        
                                    <button type="button" class='bg-gray-800 px-3 py-2.5 text-white text-center rounded-r-md' @click="showDialog()">Choose...</button>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 mt-5 mx-7">
                                    <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Icon URL</label>
                                    <input ref="iconUrlInput" class="py-2 px-3 rounded-md border-2 border-gray-500 mt-1 focus:outline-none focus:border-gray-800" type="text" placeholder="Icon/Image url" />
                            </div>
                        </div>
                        <div class="modal-footer py-3 px-5 border0-t grid grid-cols-3">
                            <button class="bg-gray-800 px-5 mr-4 py-2 text-white rounded-md" @click="showModal()">Cancel</button>
                            <span></span>
                            <button class="bg-gray-800 px-5 ml-4 py-2 text-white rounded-md" @click="showModal('apply')">OK</button>
                        </div>
                    </div>
                </div>
            </transition>
        </main>
      </div>
    </transition>
    
    <div class="absolute bottom-14 right-14">
        <button v-on:click="showModal()" class="w-14 h-14 rounded-full text-gray-800 hover:text-gray-700 shadow-lg">
            <PlusCircleIcon class="w-14 h-14" />
        </button>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { dialog } from '@electron/remote'
import { PlusCircleIcon } from '@heroicons/vue/solid'

export default defineComponent({
    name: 'Modal',
    props: {
        msg: String,
        categories: Array,
    },
    components: {
        PlusCircleIcon,
    },
    data(){
        return{
            show_modal: false,
        }
    },
    computed: {
        ...mapState('storeApplications', ['nextId', 'applications']),
    },
    methods:{
        ...mapActions('storeApplications', ['addItem']),
        ...mapActions('storeApplications', ['getItem']),
        ...mapActions('storeApplications', ['editItem']),
        editEvent(id) {
                this.getItem(id).then(item => {

                    this.$refs.appId.value = item.id
                    this.$refs.appNameInput.value = item.name
                    this.$refs.categoryInput.value = item.category
                    this.$refs.iconUrlInput.value = item.imgurl
                    this.$refs.appUrlInput.value = item.appUrl.replace(/("|')/g, "")
                    this.showModal()

                })
        },
        showModal(action){
            if(action == "apply"){
                var newItem = {}
                newItem.name = this.$refs.appNameInput.value
                newItem.category = parseInt(this.$refs.categoryInput.value)
                newItem.imgurl = this.$refs.iconUrlInput.value
                newItem.appUrl = '"'+this.$refs.appUrlInput.value+'"'

                if (!this.$refs.appId.value){
                    newItem.id = this.nextId
                    this.addItem(newItem)
                } else {
                    newItem.id = parseInt(this.$refs.appId.value)
                    this.editItem(newItem)
                }
                
                
            }
            if(this.show_modal){
                document.getElementsByTagName("html")[0].classList.remove('overflow-y-hidden'); 
                this.show_modal = false;
                this.clearFormData()
            }else{
                document.getElementsByTagName("html")[0].classList.add('overflow-y-hidden');
                this.show_modal = true;
            }
        },
        clearFormData() {
            this.$refs.appId.value = null
            this.$refs.appNameInput.value = null
            this.$refs.iconUrlInput.value = null
            this.$refs.appUrlInput.value = null
            console.log('Modal data cleared')
        },
		async showDialog() {
            const {canceled, filePaths} = await dialog.showOpenDialog({
                "title": "Choose application",
                "filters": "*",
                "properties": [
                    ["openFile"]
                ]
            });
            
            if (!canceled && filePaths.length > 0) {
                this.$refs.appUrlInput.value = filePaths[0];
            }
		}
    }
});
</script>

<style scoped>
.fade-up-down-enter-active {
    transition: all 0.3s ease;
}

.fade-up-down-leave-active {
    transition: all 0.3s ease;
}

.fade-up-down-enter-from {
    transform: translateY(10%);
    opacity: 0;
}

.fade-up-down-leave-to {
    transform: translateY(10%);
    opacity: 0;
}

.fade-enter-active{
    -webkit-transition: opacity 2s;
    transition: opacity .3s;
}

.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to{
    opacity: 0;
}
</style>
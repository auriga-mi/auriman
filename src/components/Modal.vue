<template>
<div>

    <transition name="fade">

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
                                        <input ref="appUrlInput" class="py-2 px-3 w-full rounded-l-md border-2 border-gray-500 focus:outline-none focus:border-gray-800" placeholder="Copy an URL or select the application with the Choose button..." :value="value" type="text" />
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
        <button v-on:click="showModal()" class="w-14 h-14 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 shadow-lg">
            <svg viewBox="0 0 20 20" enable-background="new 0 0 20 20" class="w-6 h-6 inline-block">
                <path fill="#FFFFFF" d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                        C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                        C15.952,9,16,9.447,16,10z" />
            </svg>
        </button>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { dialog } from '@electron/remote'

export default defineComponent({
    name: 'Modal',
    props: {
        msg: String,
        categories: Array
    },
    data(){
        return{
            show_modal: false,
            value: null
        }
    },
    methods:{
        ...mapActions('storeApplications', ['addItem']),
        showModal(action){
            if(action == "apply"){
                var newItem = {}
                newItem.name = this.$refs.appNameInput.value
                newItem.category = parseInt(this.$refs.categoryInput.value)
                newItem.imgurl = this.$refs.iconUrlInput.value
                newItem.appUrl = '"'+this.$refs.appUrlInput.value+'"'
                this.addItem(newItem)
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
            this.$refs.appNameInput.value = null
            this.$refs.iconUrlInput.value = null
            this.$refs.appUrlInput.value = null
            console.log('Modal data cleared')
        },
		async showDialog() {
            const {canceled, filePaths} = await dialog.showOpenDialog({
                "title": "Choose me",
                "filters": "*",
                "message": "Choose me",
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

<style>
/* animation for vue transition tag */

.fade-enter-active {
    transition: all 0.3s ease;
}
.fade-up-down-leave-active {
    transition: all 0.3s ease;
}
.fade-enter {
    transform: translateY(10%);
    opacity: 0;
}
.fade-up-down-leave-to {
    transform: translateY(10%);
    opacity: 0;
}

.fade-enter-active{
    transition: opacity .3s;
}

.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-to{
    opacity: 0;
}

</style>
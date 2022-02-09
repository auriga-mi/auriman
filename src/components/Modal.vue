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
                        <div class="modal-body p-5 w-full h-full overflow-y-auto ">
                            <p class="text-justify">This is where you add you new item</p>
                        </div>
                        <div class="modal-footer py-3 px-5 border0-t text-right">
                            <button class="bg-gray-800 px-5 py-2 text-white rounded-md" @click="showModal()">OK</button>
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
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Modal',
    props: {
        msg: String,
    },
    data(){
        return{
        show_modal: false,
        }
    },
    methods:{
        showModal(){
        if(this.show_modal){
            document.getElementsByTagName("html")[0].classList.remove('overflow-y-hidden'); 
            this.show_modal = false;
        }else{
            document.getElementsByTagName("html")[0].classList.add('overflow-y-hidden');
            this.show_modal = true;
        }
        }
    }
});
</script>

<style scoped>
.modal-body{
    max-height: 500px;
  }
  @media screen and (max-width: 768px){
    .modal-body {
        max-height: 400px;
    }
  }

  /* animation for vue transition tag */

  .fade-up-down-enter-active {
    transition: all 0.3s ease;
  }
  .fade-up-down-leave-active {
    transition: all 0.3s ease;
  }
  .fade-up-down-enter {
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

  .fade-enter,
  .fade-leave-to{
      opacity: 0;
  }
</style>
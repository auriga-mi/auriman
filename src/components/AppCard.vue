<template>
    <div class="m-2">
        <div class="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
        <div class="m-5 mb-3">
            <img class="w-10 mx-auto rounded-md" :src="imgurl" :alt="key" />
        </div>
        <h2 class="text-xl font-medium text-gray-700">{{ key }}</h2>
        <span class="text-blue-500 block mb-5">{{ description }}</span>

        <button v-on:click="launch(path)" class="px-4 py-2 font-medium bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">Launch</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { exec } from 'child_process'

export default defineComponent({
    name: 'AppCard',
    props: {
        key: String,
        description: String,
        imgurl: String,
        path: String,
    },
    methods: {
        launch(path){
            exec(path, function(err, data) {
                console.log(err)
                console.log(data.toString())
            });
        }
    }
})
</script>
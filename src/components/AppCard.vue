<template>
    <div class="m-2">
        <div class="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
        <div class="m-5 mb-3">
            <img class="w-10 mx-auto rounded-md" :src="imgurl" :alt="name" />
        </div>
        <h2 class="text-xl font-medium text-gray-700">{{ name }}</h2>
        <span class="text-blue-500 block mb-5">{{ category }}</span>

        <button v-on:click="launch(appUrl)" class="px-4 py-2 font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-md">{{ launchText }}</button>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { exec, spawn } from 'child_process'
import { platform } from 'process'
import * as path from 'path'

export default defineComponent({
    name: 'AppCard',
    props: {
        key: String,
        name: String,
        category: String,
        imgurl: String,
        appUrl: String,
    },
    computed: {
        launchText(){
            if (this.appUrl.indexOf('http') == 0) {
                return 'Website'
            } else {
                return 'Launch'
            }
        }
    },
    methods: {
        launch(appUrl){
            if (platform == "darwin") {

                exec (path.join('open "', appUrl, '"'), function(err) {
                    if(err){console.error(err)}
                })

            } else {

                var child = spawn ('powershell.exe', ['Start-Process', appUrl])
                child.stderr.on("data",function(data){
                    console.error("Powershell Errors: " + data)
                })
                child.stdin.end()

            }
        }
    }
})
</script>
<template>
    <div class="m-2 relative">
        <div class="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
            <div class="m-5 mb-3">
                <img class="w-10 mx-auto rounded-md" :src="imgurl" :alt="name" />
            </div>
            <h2 class="text-xl font-medium text-gray-700">{{ name }}</h2>
            <span class="text-blue-500 block mb-5">{{ category }}</span>

            <button v-on:click="launch(appUrl)" class="px-4 py-2 font-medium bg-gray-800 text-white hover:bg-gray-700 rounded-md">{{ launchText }}</button>
        </div>

        <div class="absolute top-2 right-2">
            <Menu as="div" class="ml-3 relative">
                <div>
                <MenuButton class="w-5 h-5 rounded-full text-gray-800 hover:text-gray-700">
                    <span class="sr-only">Card Menu</span>
                    <DotsVerticalIcon />
                </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" v-on:click="removeItem(id)">Remove</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']" v-on:click="editEvent(id)">Edit</a>
                    </MenuItem>
                </MenuItems>
                </transition>
            </Menu>

        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { exec, spawn } from 'child_process'
import { platform } from 'process'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { DotsVerticalIcon } from '@heroicons/vue/outline'


export default defineComponent({
    name: 'AppCard',
    props: {
        key: String,
        name: String,
        category: String,
        imgurl: String,
        appUrl: String,
        id: Number,
    },
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        DotsVerticalIcon
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
        ...mapActions('storeApplications', ['removeItem']),
        launch(appUrl){
            if (platform == "darwin") {

                exec('open '+appUrl, function(err) {
                    if(err){console.error(err)}
                })

            } else {

                var child = spawn('powershell.exe', ['Start-Process', appUrl])
                child.stderr.on("data",function(data){
                    console.error("Powershell Errors: " + data)
                })
                child.stdin.end()

            }
        },
        editEvent(id){
            this.$emit('editEvent', id)
        }
    }
})
</script>
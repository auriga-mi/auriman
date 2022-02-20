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
/*global __static*/
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
import { dialog, app } from '@electron/remote'
import { exec, execSync } from 'child_process'
import { encode } from 'node-base64-image'
import fs from 'fs-extra'
import plist from 'plist'
import { platform } from 'process'
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
                    this.$refs.appUrlInput.value = item.appUrl.replace(/("|')/g, "")
                    this.showModal()

                })
        },
        async showModal(action){
            if(action == "apply"){
                var newItem = {}
                newItem.name = this.$refs.appNameInput.value
                newItem.category = parseInt(this.$refs.categoryInput.value)
                newItem.appUrl = '"'+this.$refs.appUrlInput.value+'"'

                if (newItem.appUrl.includes('http') || !platform == "linux"){
                    newItem.appExeUrl = newItem.appUrl
                } else if (!platform == "darwin" || !platform == "win32") {
                    newItem.appExeUrl = await this.getLinuxExe(newItem.appUrl)
                }

                if (!this.$refs.appId.value){
                    newItem.id = this.nextId
                    newItem.imgurl = await this.getIconData(newItem.appUrl, newItem.id)
                    await this.addItem(newItem)
                } else {
                    newItem.id = parseInt(this.$refs.appId.value)
                    newItem.imgurl = await this.getIconData(newItem.appUrl, newItem.id)
                    await this.editItem(newItem)
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
            this.$refs.appUrlInput.value = null
            console.log('Modal data cleared')
        },
		async showDialog() {

            var path

            if (platform == "darwin") {
                path = "/Applications"
            } else if (platform == "win32") {
                path = "C:\\Program Files"
            } else {
                path = "/usr/share/applications"
            }

            const {canceled, filePaths} = await dialog.showOpenDialog({
                "title": "Choose application",
                "defaultPath" : path,
                "filters": "*",
                "properties": [
                    ["openFile"]
                ]
            });
            
            if (!canceled && filePaths.length > 0) {
                this.$refs.appUrlInput.value = filePaths[0];
            }
		},
        async getIconData(filePath, appId) {
            
            console.log(filePath)
            const iconsDir = app.getPath('userData') + '/Icons/'

            if (filePath.includes('http')) {
                
                console.log('This is a website')

                const base64Options = {
                    string: true
                }

                const base64Image = await encode("https://s2.googleusercontent.com/s2/favicons?domain_url="+filePath.replace(/("|')/g, "")+"&sz=256", base64Options)
                return base64Image

            } else {
                
                console.log('This is an app')

                if (platform == "darwin") { // macOS

                    var pathEscaped = filePath.replace(/("|')/g, "")

                    var bufferPlist = await fs.readFileSync(pathEscaped + '/Contents/Info.plist', 'utf8')
                    var originalIcon = await plist.parse(bufferPlist).CFBundleIconFile
                    if(!originalIcon.includes('.icns')){originalIcon = originalIcon+'.icns'}
                    const iconTmp = app.getPath('userData') + '/Icons/tmp/' + appId + '.icns'
                    const finalIconPng = '"' + iconsDir + appId + '.png"'

                    try {

                        await fs.ensureDir(iconsDir + 'tmp/')
                        .then(() => { console.log(iconsDir + 'tmp/ created') })
                        .catch(error => { console.error(error) })

                        await fs.copy(pathEscaped + '/Contents/Resources/' + originalIcon, iconTmp)
                        .then(() => { console.log('tmp icon created') })
                        .catch(error => { console.error(error) })

                        console.log('Spawning command: ' + 'sips -s format png "' + iconTmp + '" --out ' + finalIconPng + '')
                                
                        const child = exec ('sips -s format png "' + iconTmp + '" --out ' + finalIconPng + '', function(error) {
                            if(error){console.error(error)}
                        })

                        await new Promise( (resolve) => {
                            child.on('close', resolve)
                        })

                        fs.rm(iconTmp)
                        .then(() => { console.log('tmp icon removed') })
                        .catch(error => { console.error(error) })

                        return 'file://' + finalIconPng.replace(/("|')/g, "")

                    } catch (error) {
                        console.error(error)
                    }   
                    

                } else if (platform == "win32") { // windows

                    await fs.ensureDir(iconsDir)
                    .then(() => { console.log(iconsDir + ' created') })
                    .catch(error => { console.error(error) })

                    var iconPath = '"' + app.getPath('userData') + '\\Icons\\' + appId + '.png"'
                    var spawner =  __static + '\\binaries\\win32\\extracticon.exe ' + filePath + ' ' + iconPath

                    console.log('Spawning: ' + spawner)

                    const child = exec(spawner)

                    await new Promise( (resolve) => {
                        child.on('close', resolve)
                    })

                    return iconPath.replace(/("|')/g, "")

                } else { // linux

                    const spawner = "grep '^Icon' " + filePath + " | tail -1 | sed 's/^Icon=//' | sed 's/%.//' | sed 's/^\"//g' | sed 's/\" *$//g'"
                    console.log('Spawning: ' + spawner)

                    const child = await execSync(spawner)
                    const childToString = child.toString()

                    if (!childToString.includes('/')){
                        const iconParser = 'python3 ' + __static + '/binaries/linux/icon.py ' + childToString
                        const childPython = await execSync(iconParser)
                        const iconPathLinux = childPython.toString()
                        return 'file://' + iconPathLinux
                    } else {
                        return 'file://' + childToString
                    }

                }

            }
        },
        async getLinuxExe(filePath){
            const spawner = "grep '^Exec' " + filePath + " | head -1 | sed 's/^Exec=//' | sed 's/%.//' | sed 's/^\"//g' | sed 's/\" *$//g'"
            console.log('Spawning: ' + spawner)

            const child = await execSync(spawner)
            const childToString = child.toString()

            return childToString
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
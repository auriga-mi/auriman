<template>
<div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-6 m-5 mb-10">
        <AppCard v-for="item in applications" :key="item.name" :imgurl="item.imgurl" :description="item.description" :href="item.href" :path="item.path" />
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import AppCard from '@/components/AppCard.vue'

const applications = [
    { 
        name: 'Photoshop', 
        description: 'Graphic Design', 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
        path: '"C:\\Program Files\\Adobe\\Adobe Photoshop 2020\\Photoshop.exe"'
    },
    { 
        name: 'InDesign', 
        description: 'Graphic Design', 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg',
        path: '"C:\\Program Files\\Adobe\\Adobe InDesign 2020\\InDesign.exe"'
    },
    { 
        name: 'Illustrator', 
        description: 'Graphic Design', 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
        path: '"C:\\Program Files\\Adobe\\Adobe Illustrator 2020\\Support Files\\Contents\\Windows\\Illustrator.exe"'},
    { 
        name: 'Sony Vegas', 
        description: 'Video Editing', 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Vegas_Pro_15.0.png',
        path: '"C:\\Program Files\\VEGAS\\VEGAS Pro 15.0\\vegas150.exe"'
    },
    { 
        name: 'VS Code', 
        description: 'Programming', 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg',
        path: '"C:\\Users\\pisso\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"'
    },
]

export default defineComponent({
    name: 'Home',
    components: {
        AppCard,
    },
    setup() {
        return {
            applications
        }
    }
})
</script>

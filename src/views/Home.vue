<template>
<div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-6 m-5 mb-10 static">
        <AppCard v-for="item in applications" :key="item.name" :name="item.name" :imgurl="item.imgurl" :category="categoryName(item.category)" :href="item.href" :appUrl="item.appUrl" />
        <Modal msg="Add new item"/>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import AppCard from '@/components/AppCard.vue'
import Modal from '@/components/Modal.vue'

const applications = [
    { 
        name: 'Photoshop', 
        category: 1, 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg',
        appUrl: '/Applications/Adobe Photoshop 2021/Adobe Photoshop 2021.app'
    },
    { 
        name: 'InDesign', 
        category: 1, 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg',
        appUrl: '"C:\\Program Files\\Adobe\\Adobe InDesign 2020\\InDesign.exe"'
    },
    { 
        name: 'Illustrator', 
        category: 1, 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg',
        appUrl: '"C:\\Program Files\\Adobe\\Adobe Illustrator 2020\\Support Files\\Contents\\Windows\\Illustrator.exe"'},
    { 
        name: 'Sony Vegas', 
        category: 2, 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Vegas_Pro_15.0.png',
        appUrl: '"C:\\Program Files\\VEGAS\\VEGAS Pro 15.0\\vegas150.exe"'
    },
    { 
        name: 'VS Code', 
        category: 3, 
        imgurl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Visual_Studio_Code_1.18_icon.svg',
        appUrl: '"C:\\Users\\pisso\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"'
    },
    { 
        name: 'Behance', 
        category: 1, 
        imgurl: 'https://cdn-icons-png.flaticon.com/512/48/48975.png',
        appUrl: 'https://www.behance.net/'
    },
]

const categories = [
    {
        id: 1,
        name: 'Graphic Design'
    },
    {
        id: 2,
        name: 'Video Editing'
    },
    {
        id: 3,
        name: 'Programming'
    },
]

export default defineComponent({
    name: 'Home',
    components: {
        AppCard,
        Modal
    },
    setup() {
        return {
            applications,
            categories
        }
    },
    methods: {
        categoryName(id) {
            return this.categories.find(x => x.id === id).name
        }
    }
})
</script>

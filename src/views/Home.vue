<template>
<div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-6 m-5 mb-10 static">
        <AppCard @editEvent="editEvent" v-for="item in applications.filter(item => (item.name.toLowerCase().includes(AppSea) || categoryName(item.category).toLowerCase().includes(AppSea)))" :id="item.id" :key="item.name" :name="item.name" :imgurl="item.imgurl" :category="categoryName(item.category)" :href="item.href" :appUrl="item.appUrl" :appExeUrl="item.appExeUrl" />
        <Modal msg="Item editor" :categories="categories" ref="modalComponent" />
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'
import AppCard from '@/components/AppCard.vue'
import Modal from '@/components/Modal.vue'
import { mapState } from 'vuex'

export default defineComponent({
    name: 'Home',
    props: {
        AppSea: String
    },
    components: {
        AppCard,
        Modal
    },
    computed:{
        ...mapState('storeCategories', ['categories']),
        ...mapState('storeApplications', ['applications']),
    },
    methods: {
        categoryName(id) {
            return this.categories.find(x => x.id === id).name
        },
        editEvent(id) {
            this.$refs.modalComponent.editEvent(id)
        }
    }
})
</script>

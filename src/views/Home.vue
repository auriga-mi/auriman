<template>
<div>
    <div class="grid md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-6 m-5 mb-10 static">
        <AppCard v-for="item in applications" :key="item.name" :name="item.name" :imgurl="item.imgurl" :category="categoryName(item.category)" :href="item.href" :appUrl="item.appUrl" />
        <Modal msg="Add new item" :categories="categories"/>
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
        }
    }
})
</script>

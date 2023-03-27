<template>
    <div>
        <button class="bg-gray-800 px-5 m-5 py-2 text-white rounded-md" @click="resetAllItems()">Reset ALL APPS</button>
        <div class="grid grid-cols-1 mr-3">
            <label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Category name</label>
            <input ref="categoryNameInput" class="py-2 px-3 rounded-md border-2 border-gray-500 mt-1 focus:outline-none focus:border-gray-800" type="text" placeholder="Category name" />
        </div>
        <button class="bg-gray-800 px-5 ml-4 py-2 text-white rounded-md" @click="createCategory()">Add</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'vuex'

export default defineComponent({
    name: 'Settings',
    computed: {
        ...mapState('storeApplications', ['nextId', 'applications']),
    },
    methods: {
        ...mapActions('storeApplications', ['resetAllItems']),
        ...mapActions('storeCategories', ['addItem']),
        async createCategory(){
            var newItem = {}
            newItem.name = this.$refs.categoryNameInput.value
            newItem.id = this.nextId
            await this.addItem(newItem)
            this.clearFormData()
        },
        clearFormData() {
            this.$refs.categoryNameInput.value = null
            console.log('Form data cleared')
        },
    }
})
</script>

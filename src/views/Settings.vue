<template>
    <div>
        <button class="bg-gray-800 px-5 m-5 py-2 text-white rounded-md" @click="resetAllItems()">Reset ALL APPS</button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
    name: 'Settings',
    methods: {
        ...mapActions('storeApplications', ['resetAllItems']),
    }
})
</script>

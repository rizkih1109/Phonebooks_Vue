<script setup>
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted } from 'vue'

const store = useUsersStore()

onMounted(() => {
  store.loadUser()
})
</script>

<template>
  <PhoneCard v-for="(item, index) in store.users" :key="index" :user="item" />
</template>

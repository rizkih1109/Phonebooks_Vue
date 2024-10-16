<script setup>
import DeleteModal from './DeleteModal.vue'
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  keyword: String,
  sort: String
})
const store = useUsersStore()
const selectedUser = ref(null)
const isModal = ref(false)

let isLoading = false

onMounted(() => {
  store.loadUser()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading) {
    isLoading = true
    store.nextPage()
    store.loadUser().then(() => {
      isLoading = false
    })
  }
}

watch([() => props.keyword, () => props.sort], ([newKeyword, newSort]) => {
  if (newKeyword || newKeyword === '') {
    isLoading = true
    store.keyword = newKeyword
    store.sort = newSort
    store.firstPage()
    store.users = []
    store.loadUser().then(() => {
      isLoading = false
    })
  }
})

const openModal = (user) => {
  selectedUser.value = user
  isModal.value = true
}

const closeModal = () => (isModal.value = false)
</script>

<template>
  <PhoneCard v-for="item in store.users" :key="item.id" :user="item" @open-modal="openModal" />
  <DeleteModal v-if="isModal" :user="selectedUser" @close-modal="closeModal" />
</template>

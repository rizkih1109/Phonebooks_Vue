<script setup>
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import DeleteModal from './DeleteModal.vue'

const props = defineProps({
  keyword: String,
  sort: String,
  page: Number
})
const store = useUsersStore()
const isModal = ref(false)
const selectedUser = ref(null)
const loading = ref(false)

const handleScroll = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    store.nextPage()
    store.loadUser()
  }
}

onMounted(() => {
  if (!loading.value) {
    loading.value = true
    store.loadUser().then(() => {
      loading.value = false
    })
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch([() => props.keyword, () => props.sort], ([newKeyword, newSort]) => {
  if (newKeyword || newKeyword === '') {
    store.keyword = newKeyword
    store.sort = newSort
    store.firstPage()
    store.users = []
    store.loadUser()
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

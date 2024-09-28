<script setup>
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref, defineProps, watch, onBeforeUnmount } from 'vue'
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
// const newPage = ref(1)
let realPage = store.page
// const emit = defineEmits(['update:page'])

console.log(realPage)

// const load = async (keyword = '', sort = 'asc') => {
//   if (!loading.value) {
//     loading.value = true
//     await store.loadUser({ keyword, sort, page: 1 })
//     loading.value = false
//   }
// }

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
    store.loadUser()
    loading.value = false
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
    store.page = 1
    store.loadUser()
  }
})

// watch(
//   () => props.page,
//   (newPage) => {
//     store.page = newPage
//     load(newPage)
//   }
// )

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

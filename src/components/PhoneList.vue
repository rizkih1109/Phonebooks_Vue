<script setup>
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref, defineProps, watch } from 'vue'
import DeleteModal from './DeleteModal.vue'

const props = defineProps({
  keyword: String,
  sort: String
})
const store = useUsersStore()
const isModal = ref(false)
const selectedUser = ref(null)

const load = async (keyword = '', sort = 'asc') => {
  await store.loadUser({ keyword, sort, page: 1 })
}

onMounted(() => {
  load()
})

watch([() => props.keyword, () => props.sort], ([newKeyword, newSort]) => {
  if (newKeyword || newKeyword === '') {
    store.keyword = newKeyword
    store.sort = newSort
    load(newKeyword, newSort)
  }
})

// watch(
//   () => props.keyword,
//   (newKeyword, newSort) => {
//     if (newKeyword || newKeyword === '') {
//       store.keyword = newKeyword
//       load(newKeyword)
//     }
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

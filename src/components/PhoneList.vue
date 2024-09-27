<script setup>
import PhoneCard from './PhoneCard.vue'
import { useUsersStore } from '@/stores/users'
import { onMounted, ref, defineProps, watch } from 'vue'
import DeleteModal from './DeleteModal.vue'

const props = defineProps({
  keyword: String
})
const store = useUsersStore()
const isModal = ref(false)
const selectedUser = ref(null)

onMounted(() => {
  store.loadUser()
})

watch(
  () => props.keyword,
  (newKeyword) => {
    if (newKeyword) {
      store.keyword = newKeyword
      store.loadUser()
    }
  }
)

const openModal = (user) => {
  selectedUser.value = user
  console.log(selectedUser.value)
  isModal.value = true
}

const closeModal = () => (isModal.value = false)
</script>

<template>
  <PhoneCard v-for="item in store.users" :key="item.id" :user="item" @open-modal="openModal" />
  <DeleteModal v-if="isModal" :user="selectedUser" @close-modal="closeModal" />
</template>

<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useRouter } from 'vue-router'

const store = useUsersStore()
const router = useRouter()
const name = ref('')
const phone = ref('')

const submit = async (e) => {
  e.preventDefault()
  await store.addUser(name.value, phone.value)
  store.keyword = ''
  store.firstPage()
  router.push({ path: '/' })
}
</script>

<template>
  <form class="formCon" @submit="submit">
    <input v-model="name" required />
    <input v-model="phone" required />
    <div class="addBtn">
      <button type="submit">save</button>
      <button type="button" @click="() => router.push({ path: '/' })">cancel</button>
    </div>
  </form>
</template>

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
  router.push({ path: '/' })
}
</script>

<template>
  <form class="formCon" @submit="submit">
    <input id="name" v-model="name" required />
    <input id="phone" v-model="phone" required />
    <div class="addBtn">
      <button class="add" type="submit">save</button>
      <button class="add" type="button" @click="() => router.push({ path: '/' })">cancel</button>
    </div>
  </form>
</template>

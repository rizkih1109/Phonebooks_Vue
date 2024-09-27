<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownZA, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['update:keyword'])
const newKeyword = ref('')

const search = () => {
  emit('update:keyword', newKeyword.value)
}

library.add(faArrowDownZA, faUserPlus, faMagnifyingGlass)
</script>

<template>
  <div class="topBar">
    <button class="barBtn">
      <font-awesome-icon :icon="['fas', 'arrow-down-z-a']" />
    </button>
    <!-- <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" /> -->
    <input type="text" v-model="newKeyword" @input="search" placeholder="search" />
    <button class="barBtn" @click="() => router.push({ path: '/' })">
      <font-awesome-icon :icon="['fas', 'user-plus']" />
    </button>
  </div>
</template>

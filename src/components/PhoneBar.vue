<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownZA, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['update:keyword', 'update:sort'])
const newKeyword = ref('')
const sort = ref('asc')

const search = () => {
  emit('update:keyword', newKeyword.value)
}

const sorting = () => {
  const newSort = sort.value === 'asc' ? 'desc' : 'asc'
  sort.value = newSort
  console.log(newSort)
  emit('update:sort', newSort)
}

library.add(faArrowDownZA, faUserPlus, faMagnifyingGlass)
</script>

<template>
  <div class="topBar">
    <button class="barBtn">
      <font-awesome-icon :icon="['fas', 'arrow-down-z-a']" @click="sorting" />
    </button>
    <!-- <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="search-icon" /> -->
    <input type="text" v-model="newKeyword" @input="search" />
    <button class="barBtn" @click="() => router.push({ path: '/' })">
      <font-awesome-icon :icon="['fas', 'user-plus']" />
    </button>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowDownZA,
  faArrowUpAZ,
  faUserPlus,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
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
  emit('update:sort', newSort)
}

library.add(faArrowDownZA, faArrowUpAZ, faUserPlus, faMagnifyingGlass)
</script>

<template>
  <div class="topBar">
    <button @click="sorting">
      <font-awesome-icon
        :icon="sort === 'asc' ? ['fas', 'arrow-down-z-a'] : ['fas', 'arrow-up-a-z']"
      />
    </button>
    <div class="inputBar">
      <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      <input type="text" v-model="newKeyword" @input="search" />
    </div>
    <button @click="() => router.push({ path: '/add' })">
      <font-awesome-icon :icon="['fas', 'user-plus']" />
    </button>
  </div>
</template>

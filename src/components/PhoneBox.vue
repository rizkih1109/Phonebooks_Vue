<script setup>
import { ref } from 'vue'
import PhoneBar from './PhoneBar.vue'
import PhoneList from './PhoneList.vue'

const keyword = ref('')
const sort = ref('asc')
</script>

<template>
  <div class="container">
    <div class="barPosition">
      <PhoneBar v-model:keyword="keyword" v-model:sort="sort" />
    </div>
    <div class="cardList">
      <PhoneList :keyword="keyword" :sort="sort" />
    </div>
  </div>
</template>

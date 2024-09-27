<script setup>
import { ref } from 'vue'
import PhoneBar from './PhoneBar.vue'
import PhoneList from './PhoneList.vue'

const keyword = ref('')
</script>

<template>
  <div class="container">
    <div>
      <PhoneBar v-model:keyword="keyword" />
    </div>
    <div class="cardList">
      <PhoneList :keyword="keyword" />
    </div>
  </div>
</template>

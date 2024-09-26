<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowDownZA, faUserPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowDownZA, faUserPlus)
</script>

<template>
  <div class="topBar">
    <button class="barBtn">
      <font-awesome-icon :icon="['fas', 'arrow-down-z-a']" />
    </button>
    <input type="text" />
    <RouterLink to="/add">
      <button class="barBtn">
        <font-awesome-icon :icon="['fas', 'user-plus']" />
      </button>
    </RouterLink>
  </div>
</template>

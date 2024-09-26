<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare, faTrashCan)

defineProps({
  user: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div>
      <img src="../../public/Defaultavatar.png" alt="avatar_user" />
    </div>
    <div class="listData">
      <div>
        <p>{{ user.name }}</p>
        <p>{{ user.phone }}</p>
      </div>
      <div class="listBtn">
        <font-awesome-icon class="btn" :icon="['fas', 'pen-to-square']" />
        <font-awesome-icon :icon="['fas', 'trash-can']" />
      </div>
    </div>
  </div>
</template>

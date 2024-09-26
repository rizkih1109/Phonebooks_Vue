<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPenToSquare, faTrashCan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare, faTrashCan, faFloppyDisk)

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const store = useUsersStore()
const isEdit = ref(false)
const name = ref(props.user.name)
const phone = ref(props.user.phone)

const open = () => (isEdit.value = true)
const edit = (e) => {
  e.preventDefault()
  store.editUser(props.user.id, name.value, phone.value)
  isEdit.value = false
}
</script>

<template>
  <div v-if="isEdit" class="card">
    <div>
      <img src="../../public/Defaultavatar.png" alt="avatar_user" />
    </div>
    <div class="listData">
      <div>
        <input id="edit" v-model="name" />
        <input id="edit" v-model="phone" />
      </div>
      <div class="listBtn">
        <font-awesome-icon class="btn" :icon="['fas', 'floppy-disk']" @click="edit" />
      </div>
    </div>
  </div>

  <div v-else class="card">
    <div>
      <img src="../../public/Defaultavatar.png" alt="avatar_user" />
    </div>
    <div class="listData">
      <div>
        <p>{{ user.name }}</p>
        <p>{{ user.phone }}</p>
      </div>
      <div class="listBtn">
        <font-awesome-icon class="btn" :icon="['fas', 'pen-to-square']" @click="open" />
        <font-awesome-icon :icon="['fas', 'trash-can']" @click="$emit('open-modal', user)" />
      </div>
    </div>
  </div>
</template>

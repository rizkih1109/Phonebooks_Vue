<script setup>
import { useUsersStore } from '@/stores/users'

const props = defineProps({
  user: Object
})
const store = useUsersStore()
</script>

<template>
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h4>Delete Confirmation</h4>
        <span @click="() => $emit('close-modal')"> &#10005; </span>
      </div>
      <div className="modal-content">
        <p>Are you sure to delete this contact?</p>
      </div>
      <div className="modal-footer">
        <button @click="() => $emit('close-modal')">No</button>
        <button
          @click="
            () => {
              store.deleteUser(props.user.id)
              $emit('close-modal')
            }
          "
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>

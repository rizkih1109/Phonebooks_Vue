<script setup>
import { useUsersStore } from '@/stores/users'
import { defineProps } from 'vue'

const props = defineProps({
  user: Object
})
const store = useUsersStore()
</script>

<template>
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-header">
        <h4 className="modal-title">Delete Confirmation</h4>
        <span className="modal-close" @click="() => $emit('close-modal')"> &#10005; </span>
      </div>
      <div className="modal-content">
        <p>Are you sure to delete this contact?</p>
      </div>
      <div className="modal-footer">
        <button className="modal-button-no" @click="() => $emit('close-modal')">No</button>
        <button
          className="modal-button-yes"
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

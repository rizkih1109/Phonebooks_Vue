import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

const request = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 3000
})

export const useUsersStore = defineStore('users', () => {
  const users = ref([])
  const limit = ref(25)
  const keyword = ref('')
  const sort = ref('asc')
  const page = ref(1)

  async function loadUser() {
    try {
      const response = await request.get('phonebooks', {
        params: {
          limit: limit.value,
          keyword: keyword.value,
          sort: sort.value,
          page: page.value
        }
      })
      console.log(page.value)
      if (page.value === 1) {
        users.value = response.data.Phonebooks
      } else {
        users.value = [...users.value, ...response.data.Phonebooks]
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function addUser(name, phone) {
    try {
      const id = uuid()
      users.value.unshift({ id, name, phone })
      const response = await request.post('phonebooks', { name, phone })
      users.value = users.value.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: response.data.name,
            phone: response.data.phone
          }
        }
        return item
      })
    } catch (err) {
      console.log(err)
    }
  }

  async function editUser(id, name, phone) {
    try {
      const response = await request.put(`phonebooks/${id}`, { name, phone })
      const editResult = users.value.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: response.data.name,
            phone: response.data.phone
          }
        }
        return item
      })

      users.value = editResult.sort((a, b) => a.name.localeCompare(b.name))
    } catch (err) {
      console.log(err)
    }
  }

  async function editAvatar(id, file) {
    const response = await request.put(`phonebooks/${id}/avatar`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    users.value = users.value.map((item) => {
      if (item.id == id) {
        item.avatar = response.data.avatar
      }
      return item
    })
  }

  async function deleteUser(id) {
    try {
      await request.delete(`phonebooks/${id}`)
      users.value = users.value.filter((item) => item.id !== id)
      await loadUser()
    } catch (err) {
      console.log(err)
    }
  }

  function nextPage() {
    page.value++
  }

  function firstPage() {
    page.value = 1
  }

  return {
    users,
    limit,
    keyword,
    page,
    sort,
    addUser,
    loadUser,
    deleteUser,
    editUser,
    editAvatar,
    nextPage,
    firstPage
  }
})

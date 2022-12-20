import { create } from 'apisauce'

const api = create({
  baseURL: 'https://fark.9cloud.my.id/api',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

export default api

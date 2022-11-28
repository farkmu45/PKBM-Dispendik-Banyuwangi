import { create } from 'apisauce'

const api = create({
  baseURL: 'http://192.168.1.30:8000/api',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

export default api

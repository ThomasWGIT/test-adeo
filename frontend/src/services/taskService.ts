import axios from 'axios'

export interface Task {
  _id: string
  title: string
  description: string
  status: 'à faire' | 'en cours' | 'terminé'
}

const api = axios.create({ baseURL: '/api' })

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks')
  return data
}

export const createTask = async (title: string, description: string): Promise<Task> => {
  const { data } = await api.post('/tasks', { title, description, status: 'à faire' })
  return data
}

export const updateTask = async (id: string, status: Task['status']): Promise<Task> => {
  const { data } = await api.patch(`/tasks/${id}`, { status })
  return data
}

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`)
}

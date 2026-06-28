import api from '../api/axios';

export const taskService = {
  async getAllTasks() {
    const response = await api.get('/tasks');
    return response.data;
  },

  async getTaskById(id) {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  async createTask(data) {
    // data should contain { title, description, project, assignedTo, priority, dueDate }
    const response = await api.post('/tasks', data);
    return response.data;
  },

  async updateTask(id, data) {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id) {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  }
};

export default taskService;

import api from '../api/axios';

export const projectService = {
  async getAllProjects() {
    const response = await api.get('/projects');
    return response.data;
  },

  async getProjectById(id) {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  async createProject(title, description) {
    const response = await api.post('/projects', { title, description });
    return response.data;
  },

  async updateProject(id, data) {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  async deleteProject(id) {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};

export default projectService;

const API_BASE = process.env.REACT_APP_API_BASE_URL || '';
export const api = {
  getAgents: () => fetch(`${API_BASE}/api/agents`),
  toggleAgent: (id) => fetch(`${API_BASE}/api/agents/${id}/status`, { method: 'PATCH' }),
};

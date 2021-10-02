import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const api = {
  analyzeDomains: (domains) => {
    return axios.post(`${BASE_URL}/analyzeDomains`, {
      domains
    })
  }
}

export default api;

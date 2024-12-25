import axios from '@/utils/axios'
const API = process.env.VUE_APP_API_BASE_URL
const token = sessionStorage.getItem('jodoSafePlace');

async function list(data) {
    const tags = await axios
    .get(`${API}/events`, data)
    .then((response) => {
      return response.data
    });
    return tags
}

async function create(data) {
    const tags = await axios
    .post(`${API}/event`, data, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return tags
}

async function remove(id) {
    const tags = await axios
    .delete(`${API}/event/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return tags
}
export default ({
    list,
    create,
    remove
})
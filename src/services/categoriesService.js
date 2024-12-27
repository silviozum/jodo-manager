import axios from '@/utils/axios'
const API = process.env.VUE_APP_API_BASE_URL


async function list(data) {
    const tags = await axios
    .get(`${API}/tags`, data)
    .then((response) => {
      return response.data
    });
    return tags
}

async function create(data) {
    const token = sessionStorage.getItem('jodoSafePlace');
    const tags = await axios
    .post(`${API}/tags/create`, data, {
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
    const token = sessionStorage.getItem('jodoSafePlace');
    const tags = await axios
    .delete(`${API}/tags/delete/${id}`, {
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
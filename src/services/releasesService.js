import axios from 'axios'
const API = process.env.VUE_APP_API_BASE_URL

async function list() {
  const board = await axios
  .get(`${API}/release/2`)
  .then((response) => {
    return response.data
  });
  return board
}

async function create(data) {
    const token = sessionStorage.getItem('jodoSafePlace');
    const board = await axios
    .put(`${API}/release/update/2`, data, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return board
}


export default ({
  list,
  create
})
import axios from 'axios'
const API = process.env.VUE_APP_API_BASE_URL



async function list() {
  const users = await axios
  .get(`${API}/archives`)
  .then((response) => {
    return response.data
  });
  return users
}

async function create() {
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .post(`${API}/create-archive/`, [],{
      headers: {
          Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
      }
  })
  .then((response) => {
    return response.data
  });
  return data
}



export default ({
  list,
  create
})
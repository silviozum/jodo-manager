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

async function archive(id) {
  const data = await axios
  .get(`${API}/archive/${id}`)
  .then((response) => {
    return response.data
  });
  return data
}

async function update(archive) {
  const id = archive.id
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .put(`${API}/archive/update/${id}`, archive,{
      headers: {
          Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
      }
  })
  .then((response) => {
    return response.data
  });
  return data
}

async function remove(id) {
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .delete(`${API}/archive/delete/${id}`,{
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
  archive,
  create,
  update,
  remove
})
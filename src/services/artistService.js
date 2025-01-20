import axios from 'axios'
const API = process.env.VUE_APP_API_BASE_URL



async function list() {
  const users = await axios
  .get(`${API}/artists`)
  .then((response) => {
    return response.data
  });
  return users
}

async function artist(id) {
    const data = await axios
    .get(`${API}/artist/${id}`)
    .then((response) => {
      return response.data
    });
    return data
  }

  async function create() {
    const token = sessionStorage.getItem('jodoSafePlace');
    const data = await axios
    .post(`${API}/create-artist/`, [],{
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
    .delete(`${API}/artist/delete/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return data
  }

  async function update(artist) {
    const id = artist.id
    const token = sessionStorage.getItem('jodoSafePlace');
    const data = await axios
    .put(`${API}/artist/update/${id}`, artist,{
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
  artist,
  create,
  remove,
  update
})
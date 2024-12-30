import axios from 'axios'
const API = process.env.VUE_APP_API_BASE_URL



async function list() {
  const users = await axios
  .get(`${API}/article`)
  .then((response) => {
    return response.data
  });
  return users
}

async function article(id) {
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .get(`${API}/article/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
      }
  })
  .then((response) => {
    return response.data
  });
  return data
}

async function update(article) {
  const id = article.id
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .put(`${API}/article/${id}`, article,{
      headers: {
          Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
      }
  })
  .then((response) => {
    return response.data
  });
  return data
}

async function create() {
  const token = sessionStorage.getItem('jodoSafePlace');
  const data = await axios
  .post(`${API}/article/`, [],{
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
  .delete(`${API}/article/${id}`,{
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
  article,
  update,
  create,
  remove
})
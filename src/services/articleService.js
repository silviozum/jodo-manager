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

export default ({
  list
})
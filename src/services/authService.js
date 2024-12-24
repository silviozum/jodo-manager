import axios from 'axios'
const API = process.env.VUE_APP_API_BASE_URL

async function login(data) {
    const user = await axios
    .post(`${API}/login`, data)
    .then((response) => {
      return response.data
    });
    return user
}
export default ({
    login
})
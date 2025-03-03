import axios from '@/utils/axios'
const API = process.env.VUE_APP_API_BASE_URL

async function list(data) {
    const event = await axios
    .get(`${API}/events`, data)
    .then((response) => {
      return response.data
    });
    return event
}

async function create() {
    const token = sessionStorage.getItem('jodoSafePlace');

    const event = await axios
    .post(`${API}/event`, {}, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return event
}

async function remove(id) {
    const token = sessionStorage.getItem('jodoSafePlace');
    const event = await axios
    .delete(`${API}/events/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return event
}

async function getEvent(id) {
    const event = await axios
    .get(`${API}/event/${id}`)
    .then((response) => {
      return response.data || []
    });
    return event
}

async function update(data) {
    const token = sessionStorage.getItem('jodoSafePlace');
    const date = new Date(data.when);
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const formatedData = {
        image: data.image,
        image_thumb: data.image_thumb,
        location: data.location,
        info: data.info,
        name: data.name,
        when: formattedDate,
        published: data.published,
        eventLink: data.eventLink
    }
    const event = await axios
    .put(`${API}/event/update/${data.id}`, formatedData, {
        headers: {
            Authorization: `Bearer ${token}`  // Adiciona o Bearer token no cabeçalho
        }
    })
    .then((response) => {
      return response.data
    });
    return event
}

export default ({
    list,
    create,
    remove,
    getEvent,
    update
})
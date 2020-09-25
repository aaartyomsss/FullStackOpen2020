import axios from 'axios'
const notesUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(notesUrl)
    return request.then(response => response.data)
}

const addPhone = newPhone => {
    const request = axios.post(notesUrl, newPhone)
    return request.then(response => response.data)
}

const updatePhone = (id, newObj) => {
    return axios.put(`${notesUrl}/${id}`, newObj)
}

const deletePhone = id => {
    return axios.delete(`${notesUrl}/${id}`)
}

export default {getAll, addPhone, updatePhone, deletePhone}
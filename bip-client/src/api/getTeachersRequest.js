import axios from 'axios'
import { TEACHERS_URL } from '../constants/teachersUrl'

export async function getAllTeachers() {
  return axios({
    method: 'GET',
    url: TEACHERS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

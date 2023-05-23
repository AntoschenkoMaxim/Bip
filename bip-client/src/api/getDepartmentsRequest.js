import axios from 'axios'
import { DEPARTMENTS_URL } from '../constants/departmentsUrl'

export async function getAllDepartments() {
  return axios({
    method: 'GET',
    url: DEPARTMENTS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

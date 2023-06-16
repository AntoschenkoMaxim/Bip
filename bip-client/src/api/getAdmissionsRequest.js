import axios from 'axios'
import { ADMISSIONS_URL } from '../constants/admissionsUrl'

export async function getAllAdmissions() {
  return axios({
    method: 'GET',
    url: ADMISSIONS_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

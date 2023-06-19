import axios from 'axios'
import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'

export async function createAdmission(admissionData) {
  return axios({
    method: 'POST',
    url: ADMISSIONS_URL,
    data: admissionData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

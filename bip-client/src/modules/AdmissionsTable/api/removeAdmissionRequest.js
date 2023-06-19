import axios from 'axios'
import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'

export async function removeAdmissionById(id) {
  return axios({
    method: 'DELETE',
    url: `${ADMISSIONS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

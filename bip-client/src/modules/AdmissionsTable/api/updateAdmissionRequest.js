import axios from 'axios'
import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'

export async function updateAdmissionById(admissionData) {
  const id = admissionData.get('id')
  return axios({
    method: 'PATCH',
    url: `${ADMISSIONS_URL}/${id}`,
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

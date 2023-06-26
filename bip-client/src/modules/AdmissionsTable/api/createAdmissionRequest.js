import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'
import { api } from '../../../api/interceptors'

export async function createAdmission(admissionData) {
  return api({
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

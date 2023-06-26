import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'
import { api } from '../../../api/interceptors'

export async function updateAdmissionById(admissionData) {
  const id = admissionData.get('id')
  return api({
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

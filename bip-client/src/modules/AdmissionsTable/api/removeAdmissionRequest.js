import { ADMISSIONS_URL } from '../../../constants/admissionsUrl'
import { api } from '../../../api/interceptors'

export async function removeAdmissionById(id) {
  return api({
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

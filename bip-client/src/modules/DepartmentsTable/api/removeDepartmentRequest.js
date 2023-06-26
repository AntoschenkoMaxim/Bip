import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'
import { api } from '../../../api/interceptors'

export async function removeDepartmentById(id) {
  return api({
    method: 'DELETE',
    url: `${DEPARTMENTS_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

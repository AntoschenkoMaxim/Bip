import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'
import { api } from '../../../api/interceptors'

export async function createDepartment(departmentData) {
  return api({
    method: 'POST',
    url: DEPARTMENTS_URL,
    data: departmentData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

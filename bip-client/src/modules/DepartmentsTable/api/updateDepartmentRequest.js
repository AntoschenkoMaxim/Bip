import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'
import { api } from '../../../api/interceptors'

export async function updateDepartmentById(departmentData) {
  const id = departmentData.id
  return api({
    method: 'PATCH',
    url: `${DEPARTMENTS_URL}/${id}`,
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

import axios from 'axios'
import { DEPARTMENTS_URL } from '../../../constants/departmentsUrl'

export async function updateDepartmentById(departmentData) {
  const id = departmentData.id
  return axios({
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

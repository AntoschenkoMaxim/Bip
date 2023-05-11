import axios from 'axios'
import { BASE_URL } from '../constants/baseUrl'

export async function updateDepartmentById(departmentData) {
  const id = departmentData.id
  return axios({
    method: 'PATCH',
    url: `${BASE_URL}/${id}`,
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

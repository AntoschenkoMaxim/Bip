import { TEACHERS_URL } from '../../../constants/teachersUrl'
import { api } from '../../../api/interceptors'

export async function getTeacherById(id) {
  return api({
    method: 'GET',
    url: `${TEACHERS_URL}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

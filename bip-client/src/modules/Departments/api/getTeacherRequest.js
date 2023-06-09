import { api } from '../../../api/interceptors'

export async function getTeacherById(id, url) {
  return api({
    method: 'GET',
    url: `${url}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

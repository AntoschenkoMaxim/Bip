import { api } from '../../../api/interceptors'

export async function addLessonToDepartment(data, url) {
  return api({
    method: 'POST',
    url: url,
    data: data,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

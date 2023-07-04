import { api } from './interceptors'

export async function removeItemById(id, url) {
  return api({
    method: 'DELETE',
    url: `${url}/${id}`,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

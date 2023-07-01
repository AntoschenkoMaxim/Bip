import { api } from './interceptors'

export async function getAllItems(url) {
  return api({
    method: 'GET',
    url,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

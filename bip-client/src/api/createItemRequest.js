import { api } from './interceptors'

export async function createItem(data, url) {
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

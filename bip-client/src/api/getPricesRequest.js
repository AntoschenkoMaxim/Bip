import { PRICES_URL } from '../constants/pricesUrl'
import { api } from './interceptors'

export async function getAllPrices() {
  return api({
    method: 'GET',
    url: PRICES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

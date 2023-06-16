import axios from 'axios'
import { PRICES_URL } from '../constants/pricesUrl'

export async function getAllPrices() {
  return axios({
    method: 'GET',
    url: PRICES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

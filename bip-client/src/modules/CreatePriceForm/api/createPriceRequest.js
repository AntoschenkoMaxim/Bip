import axios from 'axios'
import { PRICES_URL } from '../../../constants/pricesUrl'

export async function createPrice(priceData) {
  return axios({
    method: 'POST',
    url: PRICES_URL,
    data: priceData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

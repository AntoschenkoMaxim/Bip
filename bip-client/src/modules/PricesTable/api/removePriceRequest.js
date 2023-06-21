import axios from 'axios'
import { PRICES_URL } from '../../../constants/pricesUrl'

export async function removePriceById(id) {
  return axios({
    method: 'DELETE',
    url: `${PRICES_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

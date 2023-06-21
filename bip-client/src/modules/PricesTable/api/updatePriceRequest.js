import axios from 'axios'
import { PRICES_URL } from '../../../constants/pricesUrl'

export async function updatePriceById(priceData) {
  const id = priceData.get('id')
  return axios({
    method: 'PATCH',
    url: `${PRICES_URL}/${id}`,
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

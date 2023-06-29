import { PRICES_URL } from '../../../constants/pricesUrl'
import { api } from '../../../api/interceptors'

export async function createPrice(priceData) {
  return api({
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

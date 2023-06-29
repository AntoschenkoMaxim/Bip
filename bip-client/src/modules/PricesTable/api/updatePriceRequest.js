import { PRICES_URL } from '../../../constants/pricesUrl'
import { api } from '../../../api/interceptors'

export async function updatePriceById(priceData) {
  const id = priceData.get('id')
  return api({
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

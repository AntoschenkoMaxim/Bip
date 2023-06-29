import { PRICES_URL } from '../../../constants/pricesUrl'
import { api } from '../../../api/interceptors'

export async function removePriceById(id) {
  return api({
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

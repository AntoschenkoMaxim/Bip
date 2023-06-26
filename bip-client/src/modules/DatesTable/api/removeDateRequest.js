import { DATES_URL } from '../../../constants/datesUrl'
import { api } from '../../../api/interceptors'

export async function removeDateById(id) {
  return api({
    method: 'DELETE',
    url: `${DATES_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

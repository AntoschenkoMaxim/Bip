import { DATES_URL } from '../constants/datesUrl'
import { api } from './interceptors'

export async function getAllDates() {
  return api({
    method: 'GET',
    url: DATES_URL,
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

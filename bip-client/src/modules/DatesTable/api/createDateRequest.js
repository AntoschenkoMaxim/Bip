import { DATES_URL } from '../../../constants/datesUrl'
import { api } from '../../../api/interceptors'

export async function createDate(dateData) {
  return api({
    method: 'POST',
    url: DATES_URL,
    data: dateData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

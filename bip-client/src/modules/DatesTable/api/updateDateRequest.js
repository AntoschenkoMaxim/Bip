import { DATES_URL } from '../../../constants/datesUrl'
import { api } from '../../../api/interceptors'

export async function updateDateById(dateData) {
  const id = dateData.get('id')
  return api({
    method: 'PATCH',
    url: `${DATES_URL}/${id}`,
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

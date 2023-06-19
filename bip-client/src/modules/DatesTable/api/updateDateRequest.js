import axios from 'axios'
import { DATES_URL } from '../../../constants/datesUrl'

export async function updateDateById(dateData) {
  const id = dateData.get('id')
  return axios({
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

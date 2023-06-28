import { STATEMENTS_URL } from '../../../constants/statementsUrl'
import { api } from '../../../api/interceptors'

export async function removeStatementById(id) {
  return api({
    method: 'DELETE',
    url: `${STATEMENTS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

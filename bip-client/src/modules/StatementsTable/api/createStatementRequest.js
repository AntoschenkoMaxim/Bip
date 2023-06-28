import { STATEMENTS_URL } from '../../../constants/statementsUrl'
import { api } from '../../../api/interceptors'

export async function createStatement(statementData) {
  return api({
    method: 'POST',
    url: STATEMENTS_URL,
    data: statementData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

import { STATEMENTS_URL } from '../../../constants/statementsUrl'
import { api } from '../../../api/interceptors'

export async function updateStatementById(statementData) {
  const id = statementData.get('id')
  return api({
    method: 'PATCH',
    url: `${STATEMENTS_URL}/${id}`,
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

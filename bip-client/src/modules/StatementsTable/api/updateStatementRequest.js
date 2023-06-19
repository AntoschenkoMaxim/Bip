import axios from 'axios'
import { STATEMENTS_URL } from '../../../constants/statementsUrl'

export async function updateStatementById(statementData) {
  const id = statementData.get('id')
  return axios({
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

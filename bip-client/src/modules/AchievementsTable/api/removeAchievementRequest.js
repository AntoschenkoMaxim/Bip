import axios from 'axios'

import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'

export async function removeAchievementById(id) {
  return axios({
    method: 'DELETE',
    url: `${ACHIEVEMENTS_URL}/${id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

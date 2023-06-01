import axios from 'axios'
import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'

export async function updateAchievementById(achievementData) {
  const id = achievementData.get('id')
  return axios({
    method: 'PATCH',
    url: `${ACHIEVEMENTS_URL}/${id}`,
    data: achievementData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'
import { api } from '../../../api/interceptors'

export async function updateAchievementById(achievementData) {
  const id = achievementData.get('id')
  return api({
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

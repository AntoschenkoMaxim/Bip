import { ACHIEVEMENTS_URL } from '../../../constants/achievementsUrl'
import { api } from '../../../api/interceptors'

export async function createAchievement(postData) {
  return api({
    method: 'POST',
    url: ACHIEVEMENTS_URL,
    data: postData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error.toJSON())
    })
}

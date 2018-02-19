import { get } from 'lodash'
import { request } from '@/services/Service'

const getByAlbum = (collectionId) => {
  return new Promise(async (resolve, reject) => {
    collectionId = parseInt(collectionId)
    const response = await request(`albums/${collectionId}/tracks`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    const tracks = response.results
    resolve(tracks)
  })
}

const search = async (query, options) => {
  const limit = get(options, 'limit', 10)
  const response = await request(`search/tracks?q=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response.results
}

export default { getByAlbum, search }

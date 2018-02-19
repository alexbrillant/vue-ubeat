import { get } from 'lodash'
import { request } from '@/services/Service'

const getById = async (collectionId) => {
  const response = await request(`albums/${collectionId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  let album = response.results[0]
  if (album) return album
  throw new Error(`Album ${collectionId} not found...`)
}

const search = async (query, options) => {
  const limit = get(options, 'limit', 10)
  const response = await request(`search/albums?q=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response.results
}

const getByArtistId = async (artistId) => {
  const response = await request(`artists/${artistId}/albums`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response.results
}

export default { getById, getByArtistId, search }

import { request } from '@/services/Service'
import { random, get } from 'lodash'

const DISCOVER_ARTIST_COUNT = 10

const randomLetter = () => {
  return String.fromCharCode(random(97, 122))
}

const discoverArtists = async () => {
  const limit = DISCOVER_ARTIST_COUNT
  const query = randomLetter() + ' ' + randomLetter() + ' ' + randomLetter()
  return search(query, { limit })
}

const search = async (query, options) => {
  const limit = get(options, 'limit', 10)
  const response = await request(`search/artists?q=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response.results
}

const getById = (artistId) => {
  artistId = parseInt(artistId)
  return new Promise(async (resolve, reject) => {
    const response = await request(`artists/${artistId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    let artist = response.results[0]
    if (artist) {
      resolve(artist)
    }
    reject(new Error(`Artist ${artistId} not found...`))
  })
}

export default { discoverArtists, getById, search }

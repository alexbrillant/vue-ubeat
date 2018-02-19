import { request } from '@/services/Service'

const searchItems = async (artist, album) => {
  artist = encodeURIComponent(artist)
  album = encodeURIComponent(album)
  const response = await request(`search/items?artist=${artist}&album=${album}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response
}

export default { searchItems }

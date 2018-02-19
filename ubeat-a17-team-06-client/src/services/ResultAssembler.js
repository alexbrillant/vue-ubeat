class Result {
  constructor ({ icon, value, route, result, button, avatar }) {
    this.avatar = avatar
    this.icon = icon
    this.value = value
    this.route = route
    this.result = result
    this.button = button
  }
}

const mapArtist = (artist) => {
  const route = { name: 'Artist', id: artist.artistId }
  return new Result({ icon: 'face', value: artist.artistName, route, result: artist })
}

const mapTrack = (track) => {
  const route = { name: 'Album', id: track.collectionId }
  let button = 'add'
  return new Result({ icon: 'audiotrack', value: track.trackName, route, result: track, button })
}

const mapCollection = (collection) => {
  const route = { name: 'Album', id: collection.collectionId }
  let button = 'add'
  return new Result({ icon: 'album', value: collection.collectionName, route, result: collection, button })
}

const mapUser = ({ user, following }) => {
  let button = 'favorite_border'
  if (isFollowing(following, user.email)) {
    button = 'favorite'
  }

  const route = { name: 'User', id: user.id, button: button }
  return new Result({ value: user.name, route, result: user, button, avatar: true })
}

const isFollowing = (following, email) => {
  if (following && following.length > 0) {
    return following.find(u => u.email === email)
  }
}

export const assembleResults = ({ results, following }) => results.map(result => {
  if (!result.wrapperType) {
    return mapUser({ user: result, following })
  }

  switch (result.wrapperType) {
    case 'artist':
      return mapArtist(result)
    case 'track':
      return mapTrack(result)
    case 'collection':
      return mapCollection(result)
  }
})

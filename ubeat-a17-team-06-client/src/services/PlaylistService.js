import { request } from '@/services/Service'

export function createPlaylist (attributes) {
  return request('playlists', {
    method: 'POST',
    body: JSON.stringify(attributes),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export function updatePlaylist (playlistId, attributes) {
  return request(`playlists/${playlistId}`, {
    method: 'PUT',
    body: JSON.stringify(attributes),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export function fetchPlaylist (playlistId) {
  return request(`playlists/${playlistId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function fetchPlaylists () {
  return request('playlists', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function deletePlaylist (playlistId) {
  return request(`playlists/${playlistId}`, {
    method: 'DELETE'
  })
}

export function deleteTrack ({playlistId, trackId}) {
  return request(`playlists/${playlistId}/tracks/${trackId}`, {
    method: 'DELETE'
  })
}

export function addTrack (playlistId, track) {
  return request(`playlists/${playlistId}/tracks`, {
    body: JSON.stringify(track),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export default {
  createPlaylist,
  updatePlaylist,
  fetchPlaylist,
  fetchPlaylists,
  addTrack,
  deleteTrack
}

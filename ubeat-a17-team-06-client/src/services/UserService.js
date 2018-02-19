import {get} from 'lodash'
import {request} from '@/services/Service'

export function createUser (attributes) {
  const body = new URLSearchParams()
  Object.keys(attributes).forEach((key) => {
    body.append(key, attributes[key])
  })
  return request('signup', {
    method: 'POST',
    body,
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function login (email, password) {
  const body = new URLSearchParams()
  body.append('email', email)
  body.append('password', password)
  return request(`login`, {
    body,
    method: 'POST',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function getCurrentUser () {
  return request(`tokenInfo`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function logoutUser () {
  return request(`logout`, {method: 'GET'})
}

export function getUser (userId) {
  return request(`users/${userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function follow (id) {
  return request(`follow`, {
    method: 'POST',
    body: JSON.stringify({id}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

export function unfollow (id) {
  return request(`follow/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  })
}

export function getUserPlaylists (id) {
  return request(`users/${id}/playlists`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
}

const search = async (query, options) => {
  const limit = get(options, 'limit', 10)
  const response = await request(`search/users?q=${query}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  return response
}

export default {
  createUser,
  login,
  getCurrentUser,
  getUser,
  getUserPlaylists,
  follow,
  unfollow,
  search
}

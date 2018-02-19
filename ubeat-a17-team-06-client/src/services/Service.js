import 'whatwg-fetch'
import ServiceError from '@/services/ServiceError'
import Cookie from 'js-cookie'
import { isEmpty } from 'lodash'

export const BASE_URL = `https://ubeat-playlit.herokuapp.com`

export async function request (url, options) {
  const token = Cookie.get('token')
  options = {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': token
    }
  }

  try {
    const response = await fetch(`${BASE_URL}/${url}`, options)
    return parseJson(response)
  } catch (error) {
    if (error instanceof ServiceError) throw error
    throw new ServiceError()
  }
}

const parseJson = async (response) => {
  const body = await response.text()
  if (isEmpty(body)) return

  const json = JSON.parse(body)
  if (response.ok) return json

  throw new ServiceError(json.errorCode, json.message)
}

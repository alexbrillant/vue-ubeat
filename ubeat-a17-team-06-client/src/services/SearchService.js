import {request} from '@/services/Service'

const globalSearch = async (query) => {
  const encodedQuery = encodeURIComponent(query)
  const results = await Promise.all([
    request(`search/users?q=${encodedQuery}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }),
    request(`search?q=${encodedQuery}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
  ])

  return assembleResults(results)
}

function assembleResults (results) {
  const userResults = results[0]
  const globalResults = results[1]

  return [...globalResults.results, ...userResults]
}

export default {globalSearch}

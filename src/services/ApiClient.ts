/* eslint-disable camelcase */

class ApiClient {
  public static get(url: string) {
    return this._handleFetch(url, {
      method: 'GET'
    })
  }

  public static post(url: string, data: Object) {
    return this._handleFetch(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public static patch(url: string, data: Object) {
    return this._handleFetch(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public static put(url: string, data: Object) {
    return this._handleFetch(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public static delete(url: string, data: Object) {
    return this._handleFetch(url, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  private static async _handleFetch(url: string, options: RequestInit) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers
      }
    })

    const { body } = await this._parseBody(response)

    if (!response.ok) {
      throw new ApiClientError(response.status, body)
    }

    return body
  }

  private static async _parseBody(response: Response) {
    try {
      const body = await response.json()
      return { body, error: null }
    } catch (error) {
      return { body: null, error }
    }
  }
}

export class ApiClientError extends Error {
  statusCode: number
  message: string
  name: string

  constructor(status: number, body: object) {
    super()

    if (body) {
      this.message = Object.keys(body).reduce((message, key) => {
        return `${message}\n - ${key}: ${body[key][0]}`
      }, 'Errores encontrados: ')
    }

    this.statusCode = status
    this.name = 'ApiClientError'
  }
}

export default ApiClient

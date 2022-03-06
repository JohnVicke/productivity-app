const { NEXT_PUBLIC_BASE_URL } = process.env

const getUrl = (url: string) => `${NEXT_PUBLIC_BASE_URL}/${url}`

const options: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

export class Api {
  static async get(url: string) {
    const data = await fetch(getUrl(url), { method: 'GET', ...options })
    if (data.ok) return data.json()
    throw new Error('Netowrk error not ok')
  }

  static async post(url: string, body: any) {
    const data = await fetch(getUrl(url), {
      method: 'POST',
      ...options,
      body: JSON.stringify(body),
    })
    if (data.ok) return data.json()
    throw new Error('Netowrk error not ok')
  }

  static async put(url: string, body: any) {
    const data = await fetch(getUrl(url), {
      method: 'PUT',
      ...options,
      body: JSON.stringify(body),
    })
    if (data.ok) return data.json()
    throw new Error('Netowrk error not ok')
  }
}

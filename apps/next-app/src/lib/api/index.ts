import { HttpError } from '../../utils/HttpError';

// eslint-disable-next-line max-classes-per-file
const { NEXT_PUBLIC_BASE_URL } = process.env;

const getUrl = (url: string) => `${NEXT_PUBLIC_BASE_URL}/${url}`;

const getOptions = (options?: Partial<RequestInit>): RequestInit => {
  const token = localStorage.getItem('token');
  return {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: token ? `Bearer ${token}` : '',
    },
  };
};

export class Api {
  static async get(url: string, options?: Partial<RequestInit>) {
    const data = await fetch(getUrl(url), {
      method: 'GET',
      ...getOptions(options),
    });
    if (data.status === 401) {
      throw new HttpError(data.statusText, { status: data.status });
    }
    if (data.ok) return data.json();
    throw new Error('Netowrk error not ok');
  }

  static async post(url: string, body: any) {
    const data = await fetch(getUrl(url), {
      method: 'POST',
      ...getOptions(),
      body: JSON.stringify(body),
    });
    if (data.status === 401) {
      throw new HttpError(data.statusText, {
        status: data.status,
        redirect: data.url,
      });
    }
    if (data.ok) return data.json();
    throw new Error('Netowrk error not ok');
  }

  static async put(url: string, body: any) {
    const data = await fetch(getUrl(url), {
      method: 'PUT',
      ...getOptions(),
      body: JSON.stringify(body),
    });
    if (data.status === 401) {
      throw new HttpError(data.statusText, {
        status: data.status,
        redirect: data.url,
      });
    }
    if (data.ok) return data.json();
    throw new Error('Netowrk error not ok');
  }
}

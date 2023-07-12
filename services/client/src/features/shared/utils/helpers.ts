/**
 * Get current time
 * @returns time in seconds
 */
export const getTime = (): number => {
  return new Date().getTime() / 1000;
};

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Fetch wrapper.
 * @param url the URL of the resource you want to fetch.
 * @param method the request method.
 * @param body the body that you want to add to your request.
 * @param mode the mode you want to use for the request.
 * @returns a Promise that resolves to a `Response` object.
 */
export async function fetchWrapper(
  url: string,
  method: RequestMethod,
  body?: string,
  mode?: RequestMode
): Promise<Response> {
  const requestOptions: RequestInit = {
    method,
    body,
    headers:
      typeof body !== 'undefined'
        ? {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        : undefined,
    mode
  };
  return fetch(url, requestOptions);
}

/**
 * Get the request method in capital letters per convention.
 * @param method request method to validate
 * @returns valid request method or `null` if `method` is not known.
 */
export function validateRequestMethod(method: string): RequestMethod | null {
  if (method === 'get') {
    return 'GET';
  }
  if (method === 'post') {
    return 'POST';
  }
  if (method === 'put') {
    return 'PUT';
  }
  if (method === 'delete') {
    return 'DELETE';
  }
  return null;
}

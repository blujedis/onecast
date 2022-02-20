export interface IPromiseResult<T> {
  err?: Error & Record<string, any>;
  data?: T;
}

/**
 * Promise wrapper that returns an object when used
 * with `await` preventing the need for try/catch.
 *
 * @example
 * const { err, data } = await promise(Promise);
 *
 * @param promise the promise to be executed.
 */
 export function promise<T>(promise: Promise<T>) {
  return promise
    .then((data) => ({ err: null, data }))
    .catch((err) => ({ err, data: null })) as IPromiseResult<T>;
}
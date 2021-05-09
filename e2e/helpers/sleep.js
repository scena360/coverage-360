/**
 * await the returned promise to sleep for `durationMs` milliseconds
 *
 * @param durationMs {Number}
 * @returns {Promise<void>}
 */
export const sleep = (durationMs) => {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, durationMs);
  });
};

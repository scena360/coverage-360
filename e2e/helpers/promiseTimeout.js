/**
 * throws error and short circuits if `promise` doesn't resolve before `deadlineMs` milliseconds have elapsed
 *
 * @param deadlineMs the deadline/timeout in milliseconds
 * @param promise the promise that we're attempting to resolve
 * @param event the name of the event associated with the promise
 * @returns {Promise<any>}
 */
export const promiseTimeout = async (deadlineMs, promise, event) => {
  let timeoutHandle;
  const timeoutPromise = new Promise((_resolve, reject) => {
    timeoutHandle = setTimeout(() => {
      reject(
        new Error(
          `Failed to fulfill promise for ${event} event in ${deadlineMs}ms`
        )
      );
    }, deadlineMs);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([promise, timeoutPromise]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  });
};

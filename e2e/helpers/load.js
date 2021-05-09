import { Page } from 'puppeteer';
import { promiseTimeout } from './promiseTimeout';

export const waitForRenderStart = (p) => {
  return promiseTimeout(
    30000,
    p.evaluate(() => {
      return new Promise(resolve => {
        const scene = document.querySelector('a-scene');
        if (scene.renderStarted) {
          resolve(true);
          return;
        }

        scene.addEventListener('renderstart', () => {
          resolve(true);
        });
      });
    }),
    'wait-for-render-start',
  );
};

/**
 * wait for: All nodes have loaded.
 * 
 * @param {Page} page 
 * @param {string} entitySelector 
 * @returns {Promise<boolean>}
 */
export const waitForEntityLoaded = (page, entitySelector) => {
  return promiseTimeout(
    60000,
    page.evaluate((entitySelector) => {
      return new Promise(resolve => {
        const scene = document.querySelector(entitySelector);

        if (scene.hasLoaded) {
          resolve(true);
          return;
        }

        scene.addEventListener('loaded', () => {
          resolve(true);
        });
      });
    }, entitySelector),
    `wait-for-entity-loaded, entity: ${entitySelector}`,
  );
};

/**
 * 
 * @param {Page} page 
 * @param {string} selector 
 * @returns {Promise<boolean>}
 */
export const gltfModelLoaded = (page, selector) => {
  return promiseTimeout(
    60000,
    // eslint-disable-next-line no-shadow
    page.evaluate((selector) => {
      return new Promise(res => {
        const model = document.querySelector(selector);

        model.addEventListener(
          'model-loaded',
          () => {
            res(true);
          },
          { once: true },
        );
      });
    }, selector),
    `load gltf with selector ${selector}`,
  );
};

// MIT Licensed
// Inspo from: jwilson8767
/**
 * Waits for an element satisfying selector to exist, then resolves promise with true, if found.
 *
 * *would normally use `toMatchElement`, but it does not play well with Aframe entities*
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady(
  page,
  selector,
  deadline = 5000,
) {
  return promiseTimeout(
    deadline,
    // eslint-disable-next-line no-shadow
    page.evaluate((selector) => {
      return new Promise(resolve => {
        const el = document.querySelector(selector);
        if (el) {
          resolve(true);
        }
        new MutationObserver((_mutationRecords, observer) => {
          // Query for elements matching the specified selector
          Array.from(document.querySelectorAll(selector)).forEach(_element => {
            resolve(true);
            // Once we have resolved we don't need the observer anymore.
            observer.disconnect();
          });
        }).observe(document.documentElement, {
          childList: true,
          subtree: true,
        });
      });
    }, selector),
    `element-ready: ${selector}`,
  );
}

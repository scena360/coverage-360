export const SITE_URL = 'http://localhost:8080';

export const BASE_ARGS = ['--no-sandbox', '--ignore-certificate-errors'];

export const BASE_LAUNCH_OPTS = {
  headless: false,
  ignoreHTTPSErrors: true,
  product: 'chrome',
  dumpio: true,
  executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
};

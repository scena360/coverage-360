import puppeteer from "puppeteer";
import { BASE_ARGS, BASE_LAUNCH_OPTS, SITE_URL } from "../consts";

export const launchPageInCognito = async () => {
  const browser = await puppeteer.launch({
    ...BASE_LAUNCH_OPTS,
    args: [
      ...BASE_ARGS,
      "--use-fake-ui-for-media-stream",
      "--use-fake-device-for-media-stream",
      "--incognito",
    ],
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(100000);

  const url = new URL(SITE_URL);
  await page.goto(url.toString());

  return { page, browser };
};

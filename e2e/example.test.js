import { Page } from "puppeteer";
import {
  waitForRenderStart,
  sleep,
  launchPageInCognito,
  waitForEntityLoaded,
} from "./helpers";

let page1;
let browser;

/**
 *
 * @param {Page} p
 * @param {string} shapeSelector
 * @returns {Promise<string>}
 */
const getShapeColor = (p, shapeSelector) =>
  p.evaluate(
    (shapeSelector) =>
      document.querySelector(shapeSelector).getAttribute("color"),
    shapeSelector
  );

describe("User opens the example Aframe App", () => {
  beforeAll(async () => {
    const res = await launchPageInCognito();
    browser = res.browser;
    page1 = res.page;
  });

  afterAll(async () => {
    await page1.close();
    await browser.close();
  });

  beforeEach(async () => {
    await waitForRenderStart(page1);
  });

  it("loads a red sphere", async () => {
    // inspo for some e2e Aframe tests: https://github.com/rvdleun/aframe-e2e-prototype
    const color = await getShapeColor(page1, "a-sphere");
    expect(color).toStrictEqual("#EF2D5E");
  });

  it("loads a blue cube", async () => {
    const color = await getShapeColor(page1, "a-box");
    expect(color).toStrictEqual("#4CC3D9");
  });

  it("loads a yellow cylinder", async () => {
    const color = await getShapeColor(page1, "a-cylinder");
    expect(color).toStrictEqual("#FFC65D");
  });

  it("animated entity reaches final height", async () => {
    const animatedBoxLoaded = await waitForEntityLoaded(page1, "#animated-box");
    expect(animatedBoxLoaded).toStrictEqual(true);

    await sleep(3000); // sleep for `dur` amount of ms
    const animatedBoxPosition = await page1.evaluate(() =>
      document.querySelector("#animated-box").getAttribute("position")
    );

    expect(animatedBoxPosition.x).toStrictEqual(0);
    expect(animatedBoxPosition.y).toStrictEqual(3);
    expect(animatedBoxPosition.z).toStrictEqual(-4);
  });
});

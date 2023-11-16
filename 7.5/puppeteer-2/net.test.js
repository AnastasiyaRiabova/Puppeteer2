const {
  clickElement,
  getText,
  days,
  movieTime,
  seats,
} = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(async () => {
  await page.close();
});

describe("GoToTheCinema test", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      timeout: 60000,
    });
  });

  test("Should book ticket", async () => {
    await days(page, "3");
    await movieTime(page, "1", "2");
    await page.waitForSelector("h1");
    await seats(page, "6", "5");
    await clickElement(page, "button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Should book 3 ticket", async () => {
    await days(page, "5");
    await movieTime(page, "2", "3");
    await page.waitForSelector("h1");
    await seats(page, "1", "7");
    await seats(page, "1", "8");
    await seats(page, "1", "9");
    await clickElement(page, "button");
    await page.waitForSelector("h1");
    const actual = await getText(page, "h2");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 60000);

  test("Should't book ticket", async () => {
    await days(page, "2");
    await movieTime(page, "1", "3");
    await page.waitForSelector("h1");
    let acceptionButton = await page.$eval(
      "button",
      (button) => button.disabled
    );
    expect(acceptionButton).toBe(true);
  }, 60000);
});
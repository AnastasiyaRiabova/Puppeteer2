let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  }, 1000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 1000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 1000);
});

describe("Github new page tests", () => {
  test("Content of the Sponsors header'", async () => {
    await page.goto("https://github.com/sponsors");

    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub Sponsors · GitHub");
  }, 1000);

  test("Content header Copilot", async () => {
    await page.goto("https://github.com/features/copilot");

    const title = await page.title();
    expect(title).toEqual("GitHub Copilot · Your AI pair programmer · GitHub");
  }, 50000);

  test("Content of the pricing header", async () => {
    await page.goto("https://github.com/pricing");

    const title = await page.title();
    expect(title).toEqual("Pricing · Plans for every developer · GitHub");
  }, 1000);
});

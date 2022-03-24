const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const axios = require ("axios");
const fs = require ("fs");

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://dmoj.ca/accounts/login/?next=");
  await new Promise((resolve) => setTimeout(resolve, 20000));
  // await page.click('#id_username');
  // await page.keyboard.type(" ");
  // await page.keyboard.press('Enter');
  // await page.keyboard.type(" ");
  // await page.keyboard.press('Enter');
  const getSubs = async () => {
    try {
      return await axios.get('https://dmoj.ca/api/v2/submissions?user=poly14')
    } catch (error) {
      console.error(error)
    }
  }
  const countSubs = async () => {
    const subs = await getSubs()
    if (subs.data.data.objects) {
      for (i = 0; i <(subs.data.data.objects).length; i++) {
        console.log(subs.data.data.objects[i].id);
        if (subs.data.data.objects[i].result=="AC"&&subs.data.data.objects[i].language=="CPP11") {
          await page.goto(`https://dmoj.ca/src/${subs.data.data.objects[i].id}/raw`);
          const code = await page.$eval('*', (el) => el.innerText);
          console.log(code); console.log(subs.data.data.objects[i].problem);
          fs.writeFile(`${subs.data.data.objects[i].problem}.cpp`, code, function (err) {
            if (err) return console.log(err);
          }); 
        }
      }
    }
  }
  countSubs()
})();
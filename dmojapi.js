const puppeteer = require ("puppeteer");
const axios = require ("axios");
const fs = require ("fs");

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto("https://dmoj.ca/accounts/login/?next=");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await page.click('#id_username');
  await page.keyboard.type(" "); //your username in the brackets
  await page.keyboard.press('Enter');
  await page.keyboard.type(" "); //your password in the brackets
  await page.keyboard.press('Enter');
  const getSubs = async () => {
    try {
      return await axios.get('https://dmoj.ca/api/v2/submissions?user=pCode14')
    } catch (error) {
      console.error(error)
    }
  }
  const countSubs = async () => {
    const subs = await getSubs()
    if (subs.data.data.objects) {
      for (i = 150; i <(subs.data.data.objects).length; i++) {
        console.log(subs.data.data.objects[i].id);
        if (subs.data.data.objects[i].result=="AC"&&subs.data.data.objects[i].language.includes("CPP")) { //CPP specific to only my submissions (don't want to log odd submissions in PY or TEXT)
          await new Promise((resolve) => setTimeout(resolve, 5000));
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


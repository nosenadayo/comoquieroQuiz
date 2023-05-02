   
const user = {
    email: 'CAMBIAR_EMAIL',
    password: "CAMBIAR_PASS"
}

const getUserInfoFromJumbo = async function(user){
       const puppeteer = require('puppeteer');
       const browser = await puppeteer.launch({ headless: false, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', devtools: true });
       const page = await browser.newPage()
       const url_supermarket = 'https://www.jumbo.cl/'

       await page.goto(url_supermarket)

       await page.setViewport({ width: 1440, height: 796 })
       await page.waitForSelector('.new-header-wrapper > .new-header-container > .new-header-right-content > .new-header-wrap-links > .primary-btn')
   
       await page.click('button[aria-label="Ingresa"')


       await page.type('input[autocomplete="username"', user.email);
       await page.type('input[name="Clave"]', user.password);
       await page.click('.new-modal-content > .new-modal-container > .modal-actions > .primary-btn > .btn-span-enter')
       const textRegex = /(json)/

       page.on('response', async (response) => {
           const headers = response.headers();

           const contentType = headers['content-type'];
           if (textRegex.test(contentType) && /profile/.test(response.url())) {
               console.log(response.url() + " data : " + (await response.json() ));
           }
       });
       await page.waitForSelector('.close-session')
       await browser.close();
   }

getUserInfoFromJumbo(user)


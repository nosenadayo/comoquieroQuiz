   
const user = {
    email: "cambiar_email",
    password: "cambiar_password"
}

const getUserInfoFromJumbo = async function(user){
    try {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({ headless: 'new', executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
        const page = await browser.newPage()
        const url_supermarket = 'https://www.jumbo.cl/'
        let user_data = {}

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
            if (textRegex.test(contentType) && /validate/.test(response.url())) {
                const { token, user } = await response.json()
                user_data.token = token
                user_data.user = user
            }
        });
        await page.waitForSelector('.close-session')
        await browser.close();

        console.log("%j", user_data);
    } catch (error) {
        console.log('Error al hacer login ', error);
    }

   }

getUserInfoFromJumbo(user)


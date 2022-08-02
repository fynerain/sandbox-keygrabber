const puppeteer = require('puppeteer');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkForButton(page) {
    var hasPressedButton = false;

    while (!hasPressedButton)
    {
        //console.log("# checking for button");
        console.clear();
        console.log("# running");
       // console.clear();
        console.log("# running.");
      //  console.clear();
        console.log("# running...");
      //  console.clear();
        console.log("# running....");
       // console.clear();

        const enabledButton = await page.$('button:not([disabled])');
        if (enabledButton !== null) {
            console.log("# found not disabled button - attempting to press it.");
            await page.evaluate((element) => { element.scrollIntoView(); }, enabledButton);
            await page.hover('button:not([disabled])')
            await page.click('button:not([disabled])');
            hasPressedButton = true
            console.log("# attempted button press");
        }
    }
}

(async () => {
    console.log(" ");
    console.log("Crappy s&box keygrabber Initialised...");
    console.log("~v2~");
    console.log("Ian (daedric_) made this :D");
   

    console.log("# going to page...")
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', userDataDir: './myUserDataDir' });
    const page = await browser.newPage();
    await page.goto('https://asset.party/~get', {waitUntil: 'domcontentloaded'});


    console.log("# putting into infinite loop until buttons are loaded :) ...")
    console.log("# if this fails then refresh/restart ...")
    var buttons = await page.$$('button')
    while (buttons.length == 0) {
        buttons = await page.$$('button')
    }
    console.log("   - " + buttons.length + " buttons detected. Should be 99.");
    console.log("# starting infinite check loop to check for enabled button");

    while (true) {    
        await checkForButton(page);
        console.clear();
        console.log("# waiting 15 seconds to avoid adding up time...");
        await sleep(15 * 1000);
    }
  })();
//Scraping Amazon listing

const puppeteer = require('puppeteer');
const productToSearch = "keyboard Led"; //whatever you want to search on the searchbar
const minPrice = 0;
const maxPrice = 29;

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto("https://www.amazon.com/");

    await page.waitForSelector("#twotabsearchtextbox")

    //Type things in the keyboard
    await page.type("#twotabsearchtextbox", productToSearch, {delay: 100});

    await page.keyboard.press(String.fromCharCode(13));
    await page.waitForSelector("#low-price")
    await page.type("#low-price", minPrice.toString(), {delay: 100});
    await page.type("#high-price", maxPrice.toString(), {delay: 100});
   
    await page.click(".a-button-input");
    await page.waitForNavigation();


    const productLinks = await page.evaluate(() => {

    const products = document.querySelectorAll(".s-main-slot a");
    const linkList = [];
    products.forEach((elem) => {
     
        linkList.push(elem.href);

    });

    return linkList;

});

    console.log(productLinks);

    //document.querySelector(".s-main-slot a");

}) ();
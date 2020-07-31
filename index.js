const puppeteer = require('puppeteer');
const readLineSync = require('readline-sync');

console.log('Bem-vindo ao WebScrapper beta do Marco');

const moedaBase = readLineSync.question('Qual a sua moeda? (ex: real, kwanza...) '|| 'real');
const moedaConsulta = readLineSync.question('Qual a sua moeda para cambio? (ex: dolar, euro) '||'dolar');

// para fazer requisições eu preciso estar dentro de uma function async
// este é o jeito de criar uma função "genérica": (async () => {})();
//(async () => {

async function roboNormal(prefix,address,domain){
  var counter = 0;

  const browser = await puppeteer.launch( {headless: false} );
  const page = await browser.newPage();
  await page.goto(prefix+'://'+address+'.'+domain);
  await page.screenshot({path: address+'.png'});

  await browser.close();
  counter++;
};
//})();

async function roboKinguila(minhaMoeda,cambioMoeda){
  
  const urlCambio = `https://www.google.com/search?rlz=1C1GCEU_pt-PTAO879AO879&ei=wdQjX5OsBLKZ_QbZhazYAQ&q=converter+${cambioMoeda}+para+${minhaMoeda}&oq=converter+${cambioMoeda}+para+${minhaMoeda}&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOgcIABBHELADOgYIABAHEB46CAgAEAcQChAeUJyMA1i0owNgyakDaABwAHgAgAHlAYgBhRCSAQUwLjIuOJgBAKABAaoBB2d3cy13aXrAAQE&sclient=psy-ab&ved=0ahUKEwjTkPzoh_fqAhWyTN8KHdkCCxsQ4dUDCAw&uact=5`;

  const browser = await puppeteer.launch( {headless: true} );
  const page = await browser.newPage();
  await page.goto(urlCambio);
  await page.screenshot({path: `hoje_${minhaMoeda}_${cambioMoeda}.png`});

  const valorCambio = await page.evaluate(() => {
    return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
  });

  console.log(`O valor de 1 ${cambioMoeda} em ${minhaMoeda} é ${valorCambio}`);
  
  await browser.close();
};

//roboNormal('http','faltadoquefazer','com.br');

roboKinguila(moedaBase,moedaConsulta);

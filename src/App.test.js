import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { extractContent } from './api'
import { getCryptoCoinName } from './api'
import { getCryptoCoinMarketCap } from './api'
import { getCryptoCoinPrice } from './api'
import { getCryptoCoinVolume } from './api'
import { getCryptoCoinCirculatingSupply } from './api'
import { getCryptoCoinChange } from './api'
import { getCryptoCoinPriceGraphImg } from './api'


let bitcoin = '<tr id="id-bitcoin" class=""><td class="text-center">1</td><td class="no-wrap currency-name" data-sort="Bitcoin"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png" class="logo-sprite" alt="Bitcoin" height="16" width="16"/><span class="currency-symbol visible-xs"><a class="link-secondary" href="/currencies/bitcoin/">BTC</a></span><br class="visible-xs"/><a class="currency-name-container link-secondary" href="/currencies/bitcoin/">Bitcoin</a></td><td class="no-wrap market-cap text-right" data-usd="1.42668853611e+11" data-btc="17722387.0" data-sort="1.42668853611e+11">$142,668,853,611</td><td class="no-wrap text-right" data-sort="8050.20529184"><a href="/currencies/bitcoin/#markets" class="price" data-usd="8050.20529184" data-btc="1.0">$8050.21</a></td><td class="no-wrap text-right" data-sort="21954122025.7"><a href="/currencies/bitcoin/#markets" class="volume" data-usd="21954122025.7" data-btc="2731352.52028">$21,954,122,026</a></td><td class="no-wrap text-right circulating-supply" data-sort="17722387.0"><span data-supply="17722387.0"><span data-supply-container="data-supply-container">17,722,387</span><span class="hidden-xs">BTC</span></span></td><td class="no-wrap percent-change  positive_change  text-right" data-timespan="24h" data-percentusd="0.284176" data-symbol="BTC" data-sort="0.284176">0.28%</td><td><a href="/currencies/bitcoin/#charts"><img class="sparkline" alt="sparkline" src="https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/1.png"/></a></td><td class="dropdown" data-more-options="data-more-options" data-cc-id="1" data-cc-slug="bitcoin"><button class="btn btn-transparent dropdown-toggle" type="button" id="dropdown-menu-1" data-toggle="dropdown"><span class="glyphicons glyphicons-more text-gray"></span></button><ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="dropdown-menu-1"><li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-watchlist-add="data-watchlist-add">Add to Watchlist</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-watchlist-remove="data-watchlist-remove">Remove from Watchlist</a></li><li class="disabled" role="presentation"><a role="menuitem" tabindex="-1" href="#" data-watchlist-full="data-watchlist-full">Watchlist full!</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="/currencies/bitcoin/#charts">View Chart</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="/currencies/bitcoin/#markets">View Markets</a></li><li role="presentation"><a role="menuitem" tabindex="-1" href="/currencies/bitcoin/historical-data/">View Historical Data</a></li></ul></td></tr>';
const regExpression = /\d/g;
const regExpressionImgGraphStartsWith = new RegExp("^(http|https)://", "i");
const regExpressionImgGraphEndsWith = /.png$/;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders welcome message', () => {
    const wrapper = shallow(<App />);
    const welcome = <h1 className="crypto-currency-title">Crypto Currencies Market Capitalization</h1>
    expect(wrapper.contains(welcome)).toEqual(true);
});

describe('Test parsing the crypto coin name', () => {
    let bitCoinNameObj = '';

    it('Test getCryptoCoinName', ()  => {
        bitCoinNameObj = getCryptoCoinName(bitcoin);
        expect(bitCoinNameObj).toBeDefined();
    });

    it('Test extractContent with name', () => {
        const bitCoinName = extractContent(bitCoinNameObj);
        expect(bitCoinName).toEqual('Bitcoin');
    });
});

describe('Test parsing the market cap value', () => {
    let bitCoinMarketCapObj = '';

    it('Test getestVartCryptoCoinMarketCap', () => {
        bitCoinMarketCapObj = getCryptoCoinMarketCap(bitcoin);
        expect(bitCoinMarketCapObj).toBeDefined();
    });

    it('Test extractContent with market cap.', () => {
        const bitCoinMarketCap = extractContent(bitCoinMarketCapObj);
        expect(bitCoinMarketCap).toMatch(regExpression);
    });
});

describe('Test parsing the price', () => {
   let bitCoinPriceObj = '';

   it('Test getCryptoCoinPrice', () => {
       bitCoinPriceObj = getCryptoCoinPrice(bitcoin);
       expect(bitCoinPriceObj).toBeDefined();
   });

   it('Test extractContent with price', () => {
      const bitCoinPrice = extractContent(bitCoinPriceObj);
      expect(bitCoinPrice).toMatch(regExpression);
   });
});

describe('Test parsing the Volume', () => {
    let bitCoinVolumeObj = '';

    it('Test getCryptoCoinVolume', () => {
        bitCoinVolumeObj = getCryptoCoinVolume(bitcoin);
        expect(bitCoinVolumeObj).toBeDefined();
    });

    it('Test extractContent with volume', () => {
       const bitCoinVolume = extractContent(bitCoinVolumeObj);
       expect(bitCoinVolume).toMatch(regExpression);
    });
});

describe('Test parsing the circulating supply', () => {
    let bitCoinCirculatingSupplyObj = '';

    it('Test getCryptoCoinCirculatingSupply', () => {
        bitCoinCirculatingSupplyObj = getCryptoCoinCirculatingSupply(bitcoin);
        expect(bitCoinCirculatingSupplyObj).toBeDefined();
    });

    it('Text extractContent with circulating supply', () => {
       const bitCoinCirculatingSupply = extractContent(bitCoinCirculatingSupplyObj);
       expect(bitCoinCirculatingSupply).toMatch(regExpression);
    });
});

describe('Test parsing the price change', () => {
   let bitCoinPriceChangeObj = '';

   it('Test bitCoinPriceChangeObj', () => {
       bitCoinPriceChangeObj = getCryptoCoinChange(bitcoin);
       expect(bitCoinPriceChangeObj).toBeDefined();
   });

   it('Test extractContent with price change', () => {
      const bitCoinPriceChange = extractContent(bitCoinPriceChangeObj);
      expect(bitCoinPriceChange).toMatch(regExpression);
   });
});

describe('Test parsing the img graph', () => {
    let bitCoinImgGraphObj = '';

    it('Test getCryptoCoinPriceGraphImg', () => {
        bitCoinImgGraphObj = getCryptoCoinPriceGraphImg(bitcoin);
        expect(bitCoinImgGraphObj).toBeDefined();
    });

    it('Test extractContent with image graph starts with https', () => {
        const bitCoinImgGraph = extractContent(bitCoinImgGraphObj);
        expect(bitCoinImgGraph).toMatch(regExpressionImgGraphStartsWith);
    });

    it('Test extractCont with image graph ends with .png', () => {
       const bitCoinImgGraph = extractContent(bitCoinImgGraphObj);
       expect(bitCoinImgGraph).toMatch(regExpressionImgGraphEndsWith);
    });
});
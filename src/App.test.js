import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, render, mount, configure } from 'enzyme';
import {extractContent, getDollarAmount} from './api'
import { getCryptoCoinName } from './api'
import { getCryptoCoinCirculatingSupply } from './api'
import { getCryptoCoinChange } from './api'
import { getCryptoCoinPriceGraphImg } from './api'

let bitcoin = 'style="display:table-row"><td class="cmc-table__cell cmc-table__cell--sticky cmc-table__cell--sortable cmc-table__cell--left cmc-table__cell--sort-by__rank"><div class="">1</div></td><td class="cmc-table__cell cmc-table__cell--sticky cmc-table__cell--sortable cmc-table__cell--left cmc-table__cell--sort-by__name"><div class="cmc-table__column-name sc-1kxikfi-0 eTVhdN"><img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png" alt="Bitcoin" width="16" height="16" class="cmc-static-icon cmc-static-icon-1"/><a href="/currencies/bitcoin/" title="Bitcoin" class="cmc-link">Bitcoin</a></div></td><td class="cmc-table__cell cmc-table__cell--sortable cmc-table__cell--right cmc-table__cell--sort-by__market-cap"><div class="">$130,775,230,453</div></td><td class="cmc-table__cell cmc-table__cell--sortable cmc-table__cell--right cmc-table__cell--sort-by__price"><a href="/currencies/bitcoin/markets/" class="cmc-link">$7,130.65</a></td><td class="cmc-table__cell cmc-table__cell--sortable cmc-table__cell--right cmc-table__cell--sort-by__volume-24-h"><a href="/currencies/bitcoin/markets/" class="cmc-link">$32,819,544,349</a></td><td class="cmc-table__cell cmc-table__cell--sortable cmc-table__cell--right cmc-table__cell--sort-by__circulating-supply"><div class="">18,339,887 BTC</div></td><td class="cmc-table__cell cmc-table__cell--sortable cmc-table__cell--right cmc-table__cell--sort-by__percent-change-24-h"><div class="cmc--change-positive">3.43%</div></td><td class="cmc-table__cell cmc-table__cell--right"><div class="cmc-table__column-graph sc-19x49g1-0 fQbfms"><a href="/currencies/bitcoin/" class="cmc-link"><img src="https://s2.coinmarketcap.com/generated/sparklines/web/7d/usd/1.png" alt="sparkline" width="164" height="48" class="cmc-price-graph"/></a></div></td><td class="cmc-table__cell cmc-table__cell--right"><div class="kdqqbs-0 gJUyCH"><div class="cmc-popover sc-12d77vg-0 ERwrC"><div class="cmc-popover__trigger"><span class="cmc-icon__wrap Icon__StyledIcon-sc-1pqyw27-0 nvudS"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-h" class="svg-inline--fa fa-ellipsis-h fa-w-16 cmc-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg></span></div></div></div></td></tr>';
const regExpressionDollar = /\d/g;
const regExpressionCheckPercent = /^\d+(\.\d+)?%$/;
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
        bitCoinMarketCapObj = getDollarAmount(bitcoin,'market-cap');
        expect(bitCoinMarketCapObj).toBeDefined();
    });

    it('Test extractContent with market cap.', () => {
        const bitCoinMarketCap = extractContent(bitCoinMarketCapObj);
        expect(bitCoinMarketCap).toMatch(regExpressionDollar);
    });
});

describe('Test parsing the price', () => {
   let bitCoinPriceObj = '';

   it('Test getCryptoCoinPrice', () => {
       bitCoinPriceObj = getDollarAmount(bitcoin,'price');
       expect(bitCoinPriceObj).toBeDefined();
   });

   it('Test extractContent with price', () => {
      const bitCoinPrice = extractContent(bitCoinPriceObj);
      expect(bitCoinPrice).toMatch(regExpressionDollar);
   });
});

describe('Test parsing the Volume', () => {
    let bitCoinVolumeObj = '';

    it('Test getCryptoCoinVolume', () => {
        bitCoinVolumeObj = getDollarAmount(bitcoin,'volume');
        expect(bitCoinVolumeObj).toBeDefined();
    });

    it('Test extractContent with volume', () => {
       const bitCoinVolume = extractContent(bitCoinVolumeObj);
       expect(bitCoinVolume).toMatch(regExpressionDollar);
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
       expect(bitCoinCirculatingSupply).toMatch(regExpressionDollar);
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
      console.log('HERE:    ' + bitCoinPriceChange);
      expect(bitCoinPriceChange).toMatch(regExpressionCheckPercent);
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
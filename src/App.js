import React, { Component } from 'react';
import './App.css';
import CryptoCoin from './CryptoCoin.js';
import DOMParser from 'react-native-html-parser'

import { extractContent } from './api'
import { getCryptoCoinName } from './api'
import { getCryptoCoinRows } from './api'
import { getDollarAmount } from './api'
import { getCryptoCoinCirculatingSupply } from './api'
import { getCryptoCoinChange } from './api'
import { getCryptoCoinPriceGraphImg } from './api'

import bitCoinGraph from './crypto_graph_images/Bitcoin.png';
import etheumGraph from './crypto_graph_images/Ethereum.png';
import xrpGraph from './crypto_graph_images/XRP.png';
import eosGraph from './crypto_graph_images/EOS.png';
import stellarGraph from './crypto_graph_images/Stellar.png';
import lightCoinGraph from './crypto_graph_images/Lightcoin.png';
import bitCoinSVGraph from './crypto_graph_images/Bitcoin_SV.png';
import tetherGraph from './crypto_graph_images/Tether.png';
import cardanoGraph from './crypto_graph_images/Cardano.png';
import tronGraph from './crypto_graph_images/TRON.png';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      intialCompDidMount: false,
      cryptoCoins: [],

      // Initialize state so user does not see blank data upon load.
      bitCoinName: 'Bitcoin',
      bitCoinMarketCap: '$183,291,780,609',
      bitCoinPrice: '$10212.89',
      bitCoinVolume: '$16,968,085,280',
      bitCoinCirculatingSupply: '17,947,100 BTC',
      bitCoinChange: '3.12%',
      bitCoinImgGraph: bitCoinGraph,

      ethereumName: 'Ethereum',
      ethereumMarketCap: '$23,291,888,034',
      ethereumPrice: '$216.00',
      ethereumVolume: '$7,787,723,916',
      ethereumCirculatingSupply: '107,834,026 ETH',
      ethereumChange: '-0.78%',
      ethereumImgGraph: etheumGraph,

      xrpName: 'XRP',
      xrpMarketCap: '$12,421,571,048',
      xrpPrice: '$0.288505',
      xrpVolume: '$1,383,669,254',
      xrpCirculatingSupply: '43,055,012,634 XRP',
      xrpChange: '-1.08%',
      xrpImgGraph: xrpGraph,

      eosName: 'EOS',
      eosMarketCap: '$3,741,247,938',
      eosPrice: '$4.01',
      eosVolume: '$1,839,379,975',
      eosCirculatingSupply: '932,659,885 EOS',
      eosChange: '2.74%',
      eosImgGraph: eosGraph,

      stellarName: 'Stellar',
      stellarMarketCap: '$1,438,586,971',
      stellarPrice: '$0.071626',
      stellarVolume: '$305,442,391',
      stellarCirculatingSupply: '20,084,647,543 XLM',
      stellarChange: '-3.93%',
      stellarImgGraph: stellarGraph,

      liteCoinName: 'Litecoin',
      liteCoinMarketCap: '$4,663,244,432',
      liteCoinPrice: '$73.66',
      liteCoinVolume: '$2,891,917,243',
      liteCoinCirculatingSupply: '63,304,229 LTC',
      liteCoinChange: '-2.63%',
      liteCoinImgGraph: lightCoinGraph,

      bitCoinSVName: 'Bitcoin SV',
      bitCoinSVMarketCap: '$2,184,179,021',
      bitCoinSVPrice: '$122.33',
      bitCoinSVVolume: '$296,450,747',
      bitCoinSVCirculatingSupply: '17,854,986 BSV',
      bitCoinSVChange: '-1.31%',
      bitCoinSVImgGraph: bitCoinSVGraph,

      tetherName: 'Tether',
      tetherMarketCap: '$4,115,654,843',
      tetherPrice: '$1.00',
      tetherVolume: '$17,459,924,055',
      tetherCirculatingSupply: '4,108,044,456 USDT',
      tetherChange: '-0.07%',
      tetherImgGraph: tetherGraph,

      cardanoName: 'Cardano',
      cardanoMarketCap: '$1,346,194,017',
      cardanoPrice: '$0.051922',
      cardanoVolume: '$98,908,964',
      cardanoCirculatingSupply: '25,927,070,538 ADA',
      cardanoChange: '1.53%',
      cardanoImgGraph: cardanoGraph,

      tronName: 'TRON',
      tronMarketCap: '$1,167,854,792',
      tronPrice: '$0.017514',
      tronVolume: '$604,474,681',
      tronCirculatingSupply: '66,682,072,191 TRX',
      tronChange: '0.54%',
      tronImgGraph: tronGraph
    };
  }

  getCryptoData() {
    fetch('http://localhost:3001/')
        .then((resp) => { return resp.text() })
        .then((data) => {
          this.main(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }

  main(data){
    // Get the crypto currency data
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(data, 'text/html');
    let arrays = getCryptoCoinRows(parsed);

    // Populate crypto coin object with data retrieved
    this.setCryptoCoins(arrays);

    // Set the timer state
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  }

  setCryptoCoins(cryptoCoins) {
      for(var i=1; i<=10; i++) {
          let cryptoCoin = {};

          cryptoCoin.coinName = getCryptoCoinName(cryptoCoins[i]);
          cryptoCoin.marketCap = getDollarAmount(cryptoCoins[i],'market-cap');
          cryptoCoin.price = getDollarAmount(cryptoCoins[i],'price');
          cryptoCoin.volume = getDollarAmount(cryptoCoins[i],'volume');
          cryptoCoin.circulatingSupply = extractContent(getCryptoCoinCirculatingSupply(cryptoCoins[i]));
          cryptoCoin.change = getCryptoCoinChange(cryptoCoins[i]);
          cryptoCoin.priceGraph = getCryptoCoinPriceGraphImg(cryptoCoins[i]);

          this.state.cryptoCoins.push(cryptoCoin);
      }
  }

  componentDidMount() {
    if ( this.state.intialCompDidMount ===  false) {
      this.state.intialCompDidMount = true;
      // Set interval at 10 for first iteration so place holder data is replaced right away from page load
      this.interval = setInterval(() => this.getCryptoData(), 10);
    } else {
      this.interval = setInterval(() => this.getCryptoData(), 10000);
    }
  }

  componentDidUpdate() {
    this.state.cryptoCoins = [];
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    // Shown upon intial page load.
    if (!this.state.intialCompDidMount) {
      return (
          <div className="App">
            <h1 className="crypto-currency-title">Crypto Currencies Market Capitalization</h1>
            <div className="crypto-coin-header-row">
              <div className="crypto-coin-header col-md-1">Name</div>
              <div className="crypto-coin-header col-md-1">Market Cap</div>
              <div className="crypto-coin-header col-md-1">Price</div>
              <div className="crypto-coin-header col-md-1">Volume (24h)</div>
              <div className="crypto-coin-header col-md-1">Circulating Supply</div>
              <div className="crypto-coin-header col-md-1">Price Change (24h)</div>
              <div className="crypto-coin-header col-md-1">Price Change (7 days)</div>
            </div>
            <span><hr className="headerLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.bitCoinName}
                CryptoCoinMarketCapProp = {this.state.bitCoinMarketCap}
                CryptoCoinPriceProp = {this.state.bitCoinPrice}
                CryptoCoinVolumeProp = {this.state.bitCoinVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.bitCoinCirculatingSupply}
                CryptoCoinChangeProp = {this.state.bitCoinChange }
                CryptoCoinImgGraphProp = {this.state.bitCoinImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.ethereumName}
                CryptoCoinMarketCapProp = {this.state.ethereumMarketCap}
                CryptoCoinPriceProp = {this.state.ethereumPrice}
                CryptoCoinVolumeProp = {this.state.ethereumVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.ethereumCirculatingSupply}
                CryptoCoinChangeProp = {this.state.ethereumChange }
                CryptoCoinImgGraphProp = {this.state.ethereumImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.xrpName}
                CryptoCoinMarketCapProp = {this.state.xrpMarketCap}
                CryptoCoinPriceProp = {this.state.xrpPrice}
                CryptoCoinVolumeProp = {this.state.xrpVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.xrpCirculatingSupply}
                CryptoCoinChangeProp = {this.state.xrpChange }
                CryptoCoinImgGraphProp = {this.state.xrpImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.eosName}
                CryptoCoinMarketCapProp = {this.state.eosMarketCap}
                CryptoCoinPriceProp = {this.state.eosPrice}
                CryptoCoinVolumeProp = {this.state.eosVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.eosCirculatingSupply}
                CryptoCoinChangeProp = {this.state.eosChange }
                CryptoCoinImgGraphProp = {this.state.eosImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.stellarName}
                CryptoCoinMarketCapProp = {this.state.stellarMarketCap}
                CryptoCoinPriceProp = {this.state.stellarPrice}
                CryptoCoinVolumeProp = {this.state.stellarVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.stellarCirculatingSupply}
                CryptoCoinChangeProp = {this.state.stellarChange }
                CryptoCoinImgGraphProp = {this.state.stellarImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.liteCoinName}
                CryptoCoinMarketCapProp = {this.state.liteCoinMarketCap}
                CryptoCoinPriceProp = {this.state.liteCoinPrice}
                CryptoCoinVolumeProp = {this.state.liteCoinVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.liteCoinCirculatingSupply}
                CryptoCoinChangeProp = {this.state.liteCoinChange }
                CryptoCoinImgGraphProp = {this.state.liteCoinImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.bitCoinSVName}
                CryptoCoinMarketCapProp = {this.state.bitCoinSVMarketCap}
                CryptoCoinPriceProp = {this.state.bitCoinSVPrice}
                CryptoCoinVolumeProp = {this.state.bitCoinSVVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.bitCoinSVCirculatingSupply}
                CryptoCoinChangeProp = {this.state.bitCoinSVChange }
                CryptoCoinImgGraphProp = {this.state.bitCoinSVImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.tetherName}
                CryptoCoinMarketCapProp = {this.state.tetherMarketCap}
                CryptoCoinPriceProp = {this.state.tetherPrice}
                CryptoCoinVolumeProp = {this.state.tetherVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.tetherCirculatingSupply}
                CryptoCoinChangeProp = {this.state.tetherChange }
                CryptoCoinImgGraphProp = {this.state.tetherImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.cardanoName}
                CryptoCoinMarketCapProp = {this.state.cardanoMarketCap}
                CryptoCoinPriceProp = {this.state.cardanoPrice}
                CryptoCoinVolumeProp = {this.state.cardanoVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.cardanoCirculatingSupply}
                CryptoCoinChangeProp = {this.state.cardanoChange }
                CryptoCoinImgGraphProp = {this.state.cardanoImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
            <CryptoCoin
                CryptoCoinNameProp = {this.state.tronName}
                CryptoCoinMarketCapProp = {this.state.tronMarketCap}
                CryptoCoinPriceProp = {this.state.tronPrice}
                CryptoCoinVolumeProp = {this.state.tronVolume}
                CryptoCoinCirculatingSupplyProp = {this.state.tronCirculatingSupply}
                CryptoCoinChangeProp = {this.state.tronChange }
                CryptoCoinImgGraphProp = {this.state.tronImgGraph}
            />
            <span><hr className="rowLine"></hr></span>
          </div>
      );
    } else {
      //shown after first data fetch
      return (
          <div className="App">
            <h1 className="crypto-currency-title">Crypto Currencies Market Capitalization</h1>
            <div className="crypto-coin-header-row">
              <div className="crypto-coin-header col-md-1">Name</div>
              <div className="crypto-coin-header col-md-1">Market Cap</div>
              <div className="crypto-coin-header col-md-1">Price</div>
              <div className="crypto-coin-header col-md-1">Volume (24h)</div>
              <div className="crypto-coin-header col-md-1">Circulating Supply</div>
              <div className="crypto-coin-header col-md-1">Price Change (24h)</div>
              <div className="crypto-coin-header col-md-1">Price Change (7 days)</div>
            </div>
            <span><hr className="headerLine"></hr></span>
            {this.state.cryptoCoins.map((key,i) =>
                <div>
                  <CryptoCoin
                      CryptoCoinNameProp = {this.state.cryptoCoins[i].coinName}
                      CryptoCoinMarketCapProp = {this.state.cryptoCoins[i].marketCap}
                      CryptoCoinPriceProp = {this.state.cryptoCoins[i].price}
                      CryptoCoinVolumeProp = {this.state.cryptoCoins[i].volume}
                      CryptoCoinCirculatingSupplyProp = {this.state.cryptoCoins[i].circulatingSupply}
                      CryptoCoinChangeProp = {this.state.cryptoCoins[i].change}
                      CryptoCoinImgGraphProp = {this.state.cryptoCoins[i].priceGraph}
                  />
                  <span><hr className="rowLine"></hr></span>
                </div>
            )}
          </div>
      );
    }
  }
}

export default App;

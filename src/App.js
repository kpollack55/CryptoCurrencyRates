import React, { Component } from 'react';
import './App.css';
import CryptoCoin from './CryptoCoin.js';
import DOMParser from 'react-native-html-parser'
import { extractContent } from './api'
import { getCryptoCoinName } from './api'
import { getCryptoCoinMarketCap } from './api'
import { getCryptoCoinPrice } from './api'
import { getCryptoCoinVolume } from './api'
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
  } // end constructor

  getCryptoData() {
    fetch('http://localhost:3001/')
        .then((resp) => { return resp.text() })
        .then((data) => {
          this.getCryptoCoinData(data);
        })
        .catch((error) => {
          console.error(error);
        });
  } // end getCryptoData

  getCryptoCoinData(data){
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(data, 'text/html');

    const bitcoin = parsed.getElementsByAttribute('id', 'id-bitcoin');
    let bitCoinName = getCryptoCoinName(bitcoin);
    bitCoinName = extractContent(bitCoinName);
    let bitCoinMarketCap = getCryptoCoinMarketCap(bitcoin);
    bitCoinMarketCap = extractContent(bitCoinMarketCap);
    let bitCoinPrice = getCryptoCoinPrice(bitcoin);
    bitCoinPrice = extractContent(bitCoinPrice);
    let bitCoinVolume = getCryptoCoinVolume(bitcoin);
    bitCoinVolume = extractContent(bitCoinVolume);
    let bitCoinCirculatingSupply = getCryptoCoinCirculatingSupply(bitcoin);
    bitCoinCirculatingSupply = extractContent(bitCoinCirculatingSupply);
    let bitCoinChange = getCryptoCoinChange(bitcoin);
    bitCoinChange = extractContent(bitCoinChange);
    let bitCoinImgGraph = getCryptoCoinPriceGraphImg(bitcoin);
    bitCoinImgGraph = extractContent(bitCoinImgGraph);

    this.setState({
      bitCoinMarketCap: bitCoinMarketCap,
      bitCoinName: bitCoinName,
      bitCoinPrice: bitCoinPrice,
      bitCoinVolume: bitCoinVolume,
      bitCoinCirculatingSupply: bitCoinCirculatingSupply,
      bitCoinChange: bitCoinChange,
      bitCoinImgGraph: bitCoinImgGraph
    });

    const ethereum = parsed.getElementsByAttribute('id', 'id-ethereum');
    let ethereumName = getCryptoCoinName(ethereum);
    ethereumName = extractContent(ethereumName);
    let ethereumMarketCap = getCryptoCoinMarketCap(ethereum);
    ethereumMarketCap = extractContent(ethereumMarketCap);
    let ethereumPrice = getCryptoCoinPrice(ethereum);
    ethereumPrice = extractContent(ethereumPrice);
    let ethereumVolume = getCryptoCoinVolume(ethereum);
    ethereumVolume = extractContent(ethereumVolume);
    let ethereumCirculatingSupply = getCryptoCoinCirculatingSupply(ethereum);
    ethereumCirculatingSupply = extractContent(ethereumCirculatingSupply);
    let ethereumChange = getCryptoCoinChange(ethereum);
    ethereumChange = extractContent(ethereumChange);
    let ethereumImgGraph = getCryptoCoinPriceGraphImg(ethereum);
    ethereumImgGraph = extractContent(ethereumImgGraph);

    this.setState({
      ethereumName: ethereumName,
      ethereumMarketCap: ethereumMarketCap,
      ethereumPrice: ethereumPrice,
      ethereumVolume: ethereumVolume,
      ethereumCirculatingSupply: ethereumCirculatingSupply,
      ethereumChange: ethereumChange,
      ethereumImgGraph: ethereumImgGraph
    });

    const xrp = parsed.getElementsByAttribute('id', 'id-ripple');
    let xrpName = getCryptoCoinName(xrp);
    xrpName = extractContent(xrpName);
    let xrpMarketCap = getCryptoCoinMarketCap(xrp);
    xrpMarketCap = extractContent(xrpMarketCap);
    let xrpPrice = getCryptoCoinPrice(xrp);
    xrpPrice = extractContent(xrpPrice);
    let xrpVolume = getCryptoCoinVolume(xrp);
    xrpVolume = extractContent(xrpVolume);
    let xrpCirculatingSupply = getCryptoCoinCirculatingSupply(xrp);
    xrpCirculatingSupply = extractContent(xrpCirculatingSupply);
    let xrpChange = getCryptoCoinChange(xrp);
    xrpChange = extractContent(xrpChange);
    let xrpImgGraph = getCryptoCoinPriceGraphImg(xrp);
    xrpImgGraph = extractContent(xrpImgGraph);

    this.setState({
      xrpName: xrpName,
      xrpMarketCap: xrpMarketCap,
      xrpPrice: xrpPrice,
      xrpVolume: xrpVolume,
      xrpCirculatingSupply: xrpCirculatingSupply,
      xrpChange: xrpChange,
      xrpImgGraph: xrpImgGraph
    });

    const eos = parsed.getElementsByAttribute('id', 'id-eos');
    let eosName = getCryptoCoinName(eos);
    eosName = extractContent(eosName);
    let eosMarketCap = getCryptoCoinMarketCap(eos);
    eosMarketCap = extractContent(eosMarketCap);
    let eosPrice = getCryptoCoinPrice(eos);
    eosPrice = extractContent(eosPrice);
    let eosVolume = getCryptoCoinVolume(eos);
    eosVolume = extractContent(eosVolume);
    let eosCirculatingSupply = getCryptoCoinCirculatingSupply(eos);
    eosCirculatingSupply = extractContent(eosCirculatingSupply);
    let eosChange = getCryptoCoinChange(eos);
    eosChange = extractContent(eosChange);
    let eosImgGraph = getCryptoCoinPriceGraphImg(eos);
    eosImgGraph = extractContent(eosImgGraph);

    this.setState({
      eosName: eosName,
      eosMarketCap: eosMarketCap,
      eosPrice: eosPrice,
      eosVolume: eosVolume,
      eosCirculatingSupply: eosCirculatingSupply,
      eosChange: eosChange,
      eosImgGraph: eosImgGraph
    });

    const stellar = parsed.getElementsByAttribute('id', 'id-stellar');
    let stellarName = getCryptoCoinName(stellar);
    stellarName = extractContent(stellarName);
    let stellarMarketCap = getCryptoCoinMarketCap(stellar);
    stellarMarketCap = extractContent(stellarMarketCap);
    let stellarPrice = getCryptoCoinPrice(stellar);
    stellarPrice = extractContent(stellarPrice);
    let stellarVolume = getCryptoCoinVolume(stellar);
    stellarVolume = extractContent(stellarVolume);
    let stellarCirculatingSupply = getCryptoCoinCirculatingSupply(stellar);
    stellarCirculatingSupply = extractContent(stellarCirculatingSupply);
    let stellarChange = getCryptoCoinChange(stellar);
    stellarChange = extractContent(stellarChange);
    let stellarImgGraph = getCryptoCoinPriceGraphImg(stellar);
    stellarImgGraph = extractContent(stellarImgGraph);

    this.setState({
      stellarName: stellarName,
      stellarMarketCap: stellarMarketCap,
      stellarPrice: stellarPrice,
      stellarVolume: stellarVolume,
      stellarCirculatingSupply: stellarCirculatingSupply,
      stellarChange: stellarChange,
      stellarImgGraph: stellarImgGraph
    });

    const liteCoin = parsed.getElementsByAttribute('id', 'id-litecoin');
    let liteCoinName = getCryptoCoinName(liteCoin);
    liteCoinName = extractContent(liteCoinName);
    let liteCoinMarketCap = getCryptoCoinMarketCap(liteCoin);
    liteCoinMarketCap = extractContent(liteCoinMarketCap);
    let liteCoinPrice = getCryptoCoinPrice(liteCoin);
    liteCoinPrice = extractContent(liteCoinPrice);
    let liteCoinVolume = getCryptoCoinVolume(liteCoin);
    liteCoinVolume = extractContent(liteCoinVolume);
    let liteCoinCirculatingSupply = getCryptoCoinCirculatingSupply(liteCoin);
    liteCoinCirculatingSupply = extractContent(liteCoinCirculatingSupply);
    let liteCoinChange = getCryptoCoinChange(liteCoin);
    liteCoinChange = extractContent(liteCoinChange);
    let liteCoinImgGraph = getCryptoCoinPriceGraphImg(liteCoin);
    liteCoinImgGraph = extractContent(liteCoinImgGraph);

    this.setState({
      liteCoinName: liteCoinName,
      liteCoinMarketCap: liteCoinMarketCap,
      liteCoinPrice: liteCoinPrice,
      liteCoinVolume: liteCoinVolume,
      liteCoinCirculatingSupply: liteCoinCirculatingSupply,
      liteCoinChange: liteCoinChange,
      liteCoinImgGraph: liteCoinImgGraph
    });

    const bitCoinSV = parsed.getElementsByAttribute('id', 'id-bitcoin-sv');
    let bitCoinSVName = getCryptoCoinName(bitCoinSV);
    bitCoinSVName = extractContent(bitCoinSVName);
    let bitCoinSVMarketCap = getCryptoCoinMarketCap(bitCoinSV);
    bitCoinSVMarketCap = extractContent(bitCoinSVMarketCap);
    let bitCoinSVPrice = getCryptoCoinPrice(bitCoinSV);
    bitCoinSVPrice = extractContent(bitCoinSVPrice);
    let bitCoinSVVolume = getCryptoCoinVolume(bitCoinSV);
    bitCoinSVVolume = extractContent(bitCoinSVVolume);
    let bitCoinSVCirculatingSupply = getCryptoCoinCirculatingSupply(bitCoinSV);
    bitCoinSVCirculatingSupply = extractContent(bitCoinSVCirculatingSupply);
    let bitCoinSVChange = getCryptoCoinChange(bitCoinSV);
    bitCoinSVChange = extractContent(bitCoinSVChange);
    let bitCoinSVImgGraph = getCryptoCoinPriceGraphImg(bitCoinSV);
    bitCoinSVImgGraph = extractContent(bitCoinSVImgGraph);

    this.setState({
      bitCoinSVName: bitCoinSVName,
      bitCoinSVMarketCap: bitCoinSVMarketCap,
      bitCoinSVPrice: bitCoinSVPrice,
      bitCoinSVVolume: bitCoinSVVolume,
      bitCoinSVCirculatingSupply: bitCoinSVCirculatingSupply,
      bitCoinSVChange: bitCoinSVChange,
      bitCoinSVImgGraph: bitCoinSVImgGraph
    });

    const tether = parsed.getElementsByAttribute('id', 'id-tether');
    let tetherName = getCryptoCoinName(tether);
    tetherName = extractContent(tetherName);
    let tetherMarketCap = getCryptoCoinMarketCap(tether);
    tetherMarketCap = extractContent(tetherMarketCap);
    let tetherPrice = getCryptoCoinPrice(tether);
    tetherPrice = extractContent(tetherPrice);
    let tetherVolume = getCryptoCoinVolume(tether);
    tetherVolume = extractContent(tetherVolume);
    let tetherCirculatingSupply = getCryptoCoinCirculatingSupply(tether);
    tetherCirculatingSupply = extractContent(tetherCirculatingSupply);
    let tetherChange = getCryptoCoinChange(tether);
    tetherChange = extractContent(tetherChange);
    let tetherImgGraph = getCryptoCoinPriceGraphImg(tether);
    tetherImgGraph = extractContent(tetherImgGraph);

    this.setState({
      tetherName: tetherName,
      tetherMarketCap: tetherMarketCap,
      tetherPrice: tetherPrice,
      tetherVolume: tetherVolume,
      tetherCirculatingSupply: tetherCirculatingSupply,
      tetherChange: tetherChange,
      tetherImgGraph: tetherImgGraph
    });

    const cardano = parsed.getElementsByAttribute('id', 'id-cardano');
    let cardanoName = getCryptoCoinName(cardano);
    cardanoName = extractContent(cardanoName);
    let cardanoMarketCap = getCryptoCoinMarketCap(cardano);
    cardanoMarketCap = extractContent(cardanoMarketCap);
    let cardanoPrice = getCryptoCoinPrice(cardano);
    cardanoPrice = extractContent(cardanoPrice);
    let cardanoVolume = getCryptoCoinVolume(cardano);
    cardanoVolume = extractContent(cardanoVolume);
    let cardanoCirculatingSupply = getCryptoCoinCirculatingSupply(cardano);
    cardanoCirculatingSupply = extractContent(cardanoCirculatingSupply);
    let cardanoChange = getCryptoCoinChange(cardano);
    cardanoChange = extractContent(cardanoChange);
    let cardanoImgGraph = getCryptoCoinPriceGraphImg(cardano);
    cardanoImgGraph= extractContent(cardanoImgGraph);

    this.setState({
      cardanoName: cardanoName,
      cardanoMarketCap: cardanoMarketCap,
      cardanoPrice: cardanoPrice,
      cardanoVolume: cardanoVolume,
      cardanoCirculatingSupply: cardanoCirculatingSupply,
      cardanoChange: cardanoChange,
      cardanoImgGraph: cardanoImgGraph
    });

    const tron = parsed.getElementsByAttribute('id', 'id-tron');
    let tronName = getCryptoCoinName(tron);
    tronName = extractContent(tronName);
    let tronMarketCap = getCryptoCoinMarketCap(tron);
    tronMarketCap = extractContent(tronMarketCap);
    let tronPrice = getCryptoCoinPrice(tron);
    tronPrice = extractContent(tronPrice);
    let tronVolume = getCryptoCoinVolume(tron);
    tronVolume = extractContent(tronVolume);
    let tronCirculatingSupply = getCryptoCoinCirculatingSupply(tron);
    tronCirculatingSupply = extractContent(tronCirculatingSupply);
    let tronChange = getCryptoCoinChange(tron);
    tronChange = extractContent(tronChange);
    let tronImgGraph = getCryptoCoinPriceGraphImg(tron);
    tronImgGraph = extractContent(tronImgGraph);

    this.setState({
      tronName: tronName,
      tronMarketCap: tronMarketCap,
      tronPrice: tronPrice,
      tronVolume: tronVolume,
      tronCirculatingSupply: tronCirculatingSupply,
      tronChange: tronChange,
      tronImgGraph: tronImgGraph
    });

    this.setState(prevState => ({
      seconds: prevState.seconds + 1
    }));
  } // end getCryptoCoinData

  setCryptoCoin(cryptoCoin) {
    let cryptoCoinName = getCryptoCoinName(cryptoCoin);
    cryptoCoinName = extractContent(cryptoCoinName);
    let cryptoCoinMarketCap = getCryptoCoinMarketCap(cryptoCoin);
    cryptoCoinMarketCap = extractContent(cryptoCoinMarketCap);
    let cryptoCoinPrice = getCryptoCoinPrice(cryptoCoin);
    cryptoCoinPrice = extractContent(cryptoCoinPrice);
    let cryptoCoinVolume = getCryptoCoinVolume(cryptoCoin);
    cryptoCoinVolume = extractContent(cryptoCoinVolume);
    let cryptoCoinCirculatingSupply = getCryptoCoinCirculatingSupply(cryptoCoin);
    cryptoCoinCirculatingSupply = extractContent(cryptoCoinCirculatingSupply);
    let cryptoCoinChange = getCryptoCoinChange(cryptoCoin);
    cryptoCoinChange = extractContent(cryptoCoinChange);
    let cryptoCoinImgGraph = getCryptoCoinPriceGraphImg(cryptoCoin);
    cryptoCoinImgGraph = extractContent(cryptoCoinImgGraph);

    this.setState({
      cryptoCoinName: cryptoCoinName,
      cryptoCoinMarketCap: cryptoCoinMarketCap,
      cryptoCoinPrice: cryptoCoinPrice,
      cryptoCoinVolume: cryptoCoinVolume,
      cryptoCoinCirculatingSupply: cryptoCoinCirculatingSupply,
      cryptoCoinChange: cryptoCoinChange,
      cryptoCoinImgGraph: cryptoCoinImgGraph
    });
  } // end setCryptoCoin

  componentDidMount() {
    if ( this.state.intialCompDidMount ==  false) {
      this.state.intialCompDidMount = true;
      this.interval = setInterval(() => this.getCryptoData(), 10);
    } else {
      this.interval = setInterval(() => this.getCryptoData(), 10000);
    }
  } // end componentDidMount

  componentWillUnmount() {
    clearInterval(this.interval);
  } // end componentWillUnmount

  render() {
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
              CryptoCoinChangeProp = {this.state.bitCoinChange + '%'}
              CryptoCoinImgGraphProp = {this.state.bitCoinImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.ethereumName}
            CryptoCoinMarketCapProp = {this.state.ethereumMarketCap}
            CryptoCoinPriceProp = {this.state.ethereumPrice}
            CryptoCoinVolumeProp = {this.state.ethereumVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.ethereumCirculatingSupply}
            CryptoCoinChangeProp = {this.state.ethereumChange + '%'}
            CryptoCoinImgGraphProp = {this.state.ethereumImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
              CryptoCoinNameProp = {this.state.xrpName}
              CryptoCoinMarketCapProp = {this.state.xrpMarketCap}
              CryptoCoinPriceProp = {this.state.xrpPrice}
              CryptoCoinVolumeProp = {this.state.xrpVolume}
              CryptoCoinCirculatingSupplyProp = {this.state.xrpCirculatingSupply}
              CryptoCoinChangeProp = {this.state.xrpChange + '%'}
              CryptoCoinImgGraphProp = {this.state.xrpImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.eosName}
            CryptoCoinMarketCapProp = {this.state.eosMarketCap}
            CryptoCoinPriceProp = {this.state.eosPrice}
            CryptoCoinVolumeProp = {this.state.eosVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.eosCirculatingSupply}
            CryptoCoinChangeProp = {this.state.eosChange + '%'}
            CryptoCoinImgGraphProp = {this.state.eosImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.stellarName}
            CryptoCoinMarketCapProp = {this.state.stellarMarketCap}
            CryptoCoinPriceProp = {this.state.stellarPrice}
            CryptoCoinVolumeProp = {this.state.stellarVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.stellarCirculatingSupply}
            CryptoCoinChangeProp = {this.state.stellarChange + '%'}
            CryptoCoinImgGraphProp = {this.state.stellarImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.liteCoinName}
            CryptoCoinMarketCapProp = {this.state.liteCoinMarketCap}
            CryptoCoinPriceProp = {this.state.liteCoinPrice}
            CryptoCoinVolumeProp = {this.state.liteCoinVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.liteCoinCirculatingSupply}
            CryptoCoinChangeProp = {this.state.liteCoinChange + '%'}
            CryptoCoinImgGraphProp = {this.state.liteCoinImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.bitCoinSVName}
            CryptoCoinMarketCapProp = {this.state.bitCoinSVMarketCap}
            CryptoCoinPriceProp = {this.state.bitCoinSVPrice}
            CryptoCoinVolumeProp = {this.state.bitCoinSVVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.bitCoinSVCirculatingSupply}
            CryptoCoinChangeProp = {this.state.bitCoinSVChange + '%'}
            CryptoCoinImgGraphProp = {this.state.bitCoinSVImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.tetherName}
            CryptoCoinMarketCapProp = {this.state.tetherMarketCap}
            CryptoCoinPriceProp = {this.state.tetherPrice}
            CryptoCoinVolumeProp = {this.state.tetherVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.tetherCirculatingSupply}
            CryptoCoinChangeProp = {this.state.tetherChange + '%'}
            CryptoCoinImgGraphProp = {this.state.tetherImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.cardanoName}
            CryptoCoinMarketCapProp = {this.state.cardanoMarketCap}
            CryptoCoinPriceProp = {this.state.cardanoPrice}
            CryptoCoinVolumeProp = {this.state.cardanoVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.cardanoCirculatingSupply}
            CryptoCoinChangeProp = {this.state.cardanoChange + '%'}
            CryptoCoinImgGraphProp = {this.state.cardanoImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
          <CryptoCoin
            CryptoCoinNameProp = {this.state.tronName}
            CryptoCoinMarketCapProp = {this.state.tronMarketCap}
            CryptoCoinPriceProp = {this.state.tronPrice}
            CryptoCoinVolumeProp = {this.state.tronVolume}
            CryptoCoinCirculatingSupplyProp = {this.state.tronCirculatingSupply}
            CryptoCoinChangeProp = {this.state.tronChange + '%'}
            CryptoCoinImgGraphProp = {this.state.tronImgGraph}
          />
          <span><hr className="rowLine"></hr></span>
      </div>
    );
  }
}

export default App;

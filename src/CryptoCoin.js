import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class CryptoCoin extends Component {

    render() {
        const changeRateStyle = this.getChangeRateStyle();
        const changeRateDeskTopStyle = this.getChangeRateDeskTopStyle();
        const cryptoCoinGraph = 'cryptoCoinGraph';

        return (
            <div>
                <div className="crypto-coin-row">
                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Name:</div>
                        <div className="crypto-coin-name" >{this.props.CryptoCoinNameProp}</div>
                    </div>
                    <div className="crypto-coin-desktop crypto-coin-name col-md-1">{this.props.CryptoCoinNameProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Market Cap:</div>
                        <div className="crypto-market-cap">{this.props.CryptoCoinMarketCapProp}</div>
                    </div>
                    <div className="crypto-coin-desktop crypto-market-cap col-md-1">{this.props.CryptoCoinMarketCapProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Price:</div>
                        <div className="crypto-price">{this.props.CryptoCoinPriceProp}</div>
                    </div>
                    <div className="crypto-coin-desktop crypto-price col-md-1">{this.props.CryptoCoinPriceProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Volume (24h):</div>
                        <div className="crypto-volume">{this.props.CryptoCoinVolumeProp}</div>
                    </div>
                    <div className="crypto-coin-desktop crypto-volume col-md-1">{this.props.CryptoCoinVolumeProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Circulating Supply:</div>
                        <div className="crypto-circulating-supply">{this.props.CryptoCoinCirculatingSupplyProp}</div>
                    </div>
                    <div className="crypto-coin-desktop crypto-circulating-supply col-md-1">{this.props.CryptoCoinCirculatingSupplyProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Price Change (24h):</div>
                        <div className={changeRateStyle}>{this.props.CryptoCoinChangeProp}</div>
                    </div>
                    <div className={changeRateDeskTopStyle}>{this.props.CryptoCoinChangeProp}</div>

                    <div className="crypto-coin-field-mobile">
                        <div className="crypto-coin-header">Price Change (7days):</div>
                        <img src={this.props.CryptoCoinImgGraphProp} className={cryptoCoinGraph} alt="Crypto Coin Graph" />
                    </div>
                    <img className="crypto-coin-desktop col-md-1" src={this.props.CryptoCoinImgGraphProp} alt="Crypto Coin Graph" />
                </div>
            </div>
        )
    }

    getChangeRateStyle() {
        // Add style if change is negative or positive
        let changeRateStyle = '';
        if (this.props.CryptoCoinChangeProp.includes('-')) {
            changeRateStyle += 'crypto-price-change-negative';
        }
        else {
            changeRateStyle += 'crypto-price-change-postive';
        }

        return changeRateStyle;
    } // end getChangeRateStyle

    getChangeRateDeskTopStyle() {
        // Add style if change is negative or positive
        let changeRateDeskTopStyle = 'crypto-coin-desktop col-md-1 ';
        if (this.props.CryptoCoinChangeProp.includes('-')) {
            changeRateDeskTopStyle += 'crypto-price-change-negative';
        }
        else {
            changeRateDeskTopStyle += 'crypto-price-change-postive';
        }

        return changeRateDeskTopStyle;
    } // end getChangeRateDeskTopStyle
}

export default CryptoCoin;
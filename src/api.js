import DOMParser from "react-native-html-parser";

export function getCryptoData() {
    return fetch('http://localhost:3001/')
        .then((resp) => {
            console.log(resp.toString());
            alert(resp.text());
            return resp.text() })
        .then((data) => {
        })
        .catch((error) => {
            console.error(error);
        });
} // end getCryptoData

export function extractContent(element) {
    element = element.toString().replace(/(\r\n|\n|\r)/gm, " ");
    element = element.toString().replace('*', "");
    let span = document.createElement('span');
    span.innerHTML = element;

    return span.textContent || span.innerText;
} // end extractContent

export function getCryptoCoinName(cryptoCoin){
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const nameElement = parsedElement.getElementsByAttribute('class', 'currency-name-container link-secondary');
    const nameValue = parser.parseFromString(nameElement.toString(), 'text/html');

    return nameValue;
} // end getCryptoCoinName

export function getCryptoCoinMarketCap(cryptoCoin){
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const marketCapElement = parsedElement.getElementsByAttribute('class', 'no-wrap market-cap text-right');
    const marketCapValue = parser.parseFromString(marketCapElement.toString(), 'text/html');

    return marketCapValue;
} // end getCryptoCoinMarketCap

export function getCryptoCoinPrice(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const priceElement = parsedElement.getElementsByAttribute('class','price');
    const priceValue = parser.parseFromString(priceElement.toString(), 'text/html');

    return priceValue;
} // end getCryptoCoinPrice

export function getCryptoCoinVolume(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const volumeElement = parsedElement.getElementsByAttribute('class', 'volume');
    const volumeValue = parser.parseFromString(volumeElement.toString(), 'text/html');

    return volumeValue;
} // end getCryptoCoinVolume

export function getCryptoCoinCirculatingSupply(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const circulatingSupplyElement = parsedElement.getElementsByAttribute('class','no-wrap text-right circulating-supply');
    const circulatingSupplyValue = parser.parseFromString(circulatingSupplyElement.toString(), 'text/html');

    return circulatingSupplyValue;
} // end getCryptoCoinCirculatingSupply

export function getCryptoCoinChange(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const percentIndex = parsedElement.toString().indexOf('%');

    // Get the trailing characters up to >
    const changeElement = parsedElement.toString().substring((percentIndex - 6), percentIndex);
    const coinChangeValue = changeElement.replace(/("|>)/g, "");

    return coinChangeValue;
} // end getCryptoCoinChange

export function getCryptoCoinPriceGraphImg(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    let imgElement = parsedElement.getElementsByAttribute('class', 'sparkline');
    let imgElementStr = imgElement.toString();

    // lazyload class may be added to an elements attribute in the event of a lazyload
    if (imgElementStr === "") {
        imgElement = parsedElement.getElementsByAttribute('class', 'sparkline lazyload');
        imgElementStr = imgElement.toString();
    }

    // Get starting end ending indexs
    const URIStartIndex = imgElementStr.indexOf(':');
    const URIEndIndex = imgElementStr.indexOf('png');

    // Get img path
    const imgValue = imgElementStr.substring((URIStartIndex-5), (URIEndIndex+3));

    return imgValue;
} // end getCryptoCoinPriceGraphImg
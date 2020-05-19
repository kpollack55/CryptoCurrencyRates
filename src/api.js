import DOMParser from "react-native-html-parser";


export function extractContent(element) {
    element = element.toString().replace(/(\r\n|\n|\r)/gm, " ");
    element = element.toString().replace('*', "");
    let span = document.createElement('span');
    span.innerHTML = element;

    return span.textContent || span.innerText;
}

export function getCryptoCoinRows(cryptoCoin) {
    let cryptoCoins = new Array();
    cryptoCoins = cryptoCoin.toString().split("<tr class=\"cmc-table-row\"")

    return cryptoCoins;
}

export function getDollarAmount(cryptoCoin, searchField) {
    const fieldIndex = cryptoCoin.toString().indexOf(searchField);
    const startIndex = cryptoCoin.toString().indexOf('$',fieldIndex);
    const endIndex = cryptoCoin.toString().indexOf('<', startIndex);
    const subString = cryptoCoin.toString().substring(startIndex, endIndex);

    return subString;
}

export function getCryptoCoinCirculatingSupply(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const circulatingSupplyElm = parsedElement.toString().split('circulating-supply');

    if (circulatingSupplyElm[1] !== undefined) {
        const start = circulatingSupplyElm[1].toString().search(/\d/);
        const end = circulatingSupplyElm[1].toString().indexOf('<', start);
        const circulatingSupply = circulatingSupplyElm[1].toString().substring(start,end);

        return circulatingSupply;
    } else {
        return '';
    }
}

export function getCryptoCoinName(cryptoCoin){
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const nameElm = parsedElement.toString().split('title');

    if (nameElm[1] !== undefined) {
        const start = nameElm[1].toString().indexOf("\"") + 1;
        const end = nameElm[1].toString().indexOf("\"",start + 1);
        const coinName = nameElm[1].toString().substring(start,end);

        return coinName;
    } else {
        return '';
    }
}

export function getCryptoCoinChange(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const changeElm = parsedElement.toString().split('change-');

    if (changeElm[2] !== undefined) {
        const start = changeElm[2].toString().indexOf(">") + 1
        const end = changeElm[2].toString().indexOf("<",start)
        const coinChange = changeElm[2].toString().substring(start,end);

        return coinChange;
    } else {
        return '';
    }
}

export function getCryptoCoinPriceGraphImg(cryptoCoin) {
    const parser = new DOMParser.DOMParser();
    const parsedElement = parser.parseFromString(cryptoCoin.toString(), 'text/html');
    const imgElm = parsedElement.toString().split('img src=');

    if (imgElm[2] !== undefined) {
        const start = imgElm[2].toString().indexOf("\"") + 1;
        const end = imgElm[2].toString().indexOf("\"",start);
        const coinImgGraph = imgElm[2].toString().substring(start,end);

        return coinImgGraph;
    } else {
        return '';
    }
}
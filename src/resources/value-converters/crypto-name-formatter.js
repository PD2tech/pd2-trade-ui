export class CryptoNameValueConverter  {
    toView(value) {
        if (!value) {
            return;
        }

        if (value === 'BTC') {
            return 'Bitcoin';
        }

        if (value === 'ETH') {
            return 'Ethereum';
        }

        if (value === 'LTC') {
            return 'Litecoin';
        }
    }
}

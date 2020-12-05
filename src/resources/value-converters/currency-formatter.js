import numeral from 'numeral';

export class CurrencyFormatValueConverter {
    toView(value) {
        if (!value) {
            return;
        }

        return numeral(value).format('($0,0.00)');
    }

    noDollarSign(value) {
        if (!value) {
            return;
        }

        return numeral(value).format('(0,0.00)');
    }
}
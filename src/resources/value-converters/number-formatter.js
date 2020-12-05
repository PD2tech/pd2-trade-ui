import numeral from 'numeral';

export class NumberFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }

        if (!format) {
            format = '(0,0.00)';
        }

        return numeral(value).format(format);
    }
}

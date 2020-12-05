import moment from 'moment';
export class DateFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }
        return moment.utc(value).local().format(format);
    }
}

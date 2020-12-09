import moment from 'moment';
export class DateFormatValueConverter {
    toView(value, format) {
        if (!value) {
            return;
        }
        if (!format) {
            format = 'MMM Do YYYY, h:mm:ss a';
        }
        return moment.utc(value).local().format(format);
    }
}

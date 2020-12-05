export class FormatHtmlValueConverter {
    toView(value) {
        if (value) {
            return value.replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
    }
}

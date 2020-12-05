export class FormatFromHtmlValueConverter {
    toView(value) {
        if (value) {
            return value.replace(/<br>/g, '\n');
        }
    }
}

export class PascalCaseValueConverter {
    toView(value) {
        if (!value) {
            return;
        }

        let wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
        return value.match(wordRe).join(" ");
    }
}

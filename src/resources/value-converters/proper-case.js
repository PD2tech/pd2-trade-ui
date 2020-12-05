export class ProperCaseValueConverter {
    toView(value) {
        if (!value) {
            return;
        }

        const splitStr = value.toLowerCase().split(' ');
        return splitStr.map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(' ');
    }
}

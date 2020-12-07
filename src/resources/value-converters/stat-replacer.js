export class StatReplacerValueConverter {
    toView(value, statValue) {
        if (!value) {
            return;
        }
        if (!statValue) {
            return value;
        }
        return value.replace('{X}', statValue);
    }
}

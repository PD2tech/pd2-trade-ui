export class FullNameValueConverter {
    toView(value) {
        if (!value) {
            return;
        }

        return `${value.firstName ? value.firstName : ''} ${value.lastName ? value.lastName : ''}`;
    }
}

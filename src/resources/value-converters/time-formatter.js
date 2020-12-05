export class TimeFormatValueConverter {
    toView(value) {
        // Special case for time = 0
        if (value === 0) {
            return "0 Hrs"
        }
        if (!value) {
            return;
        }
        let time = (value / 60);
        let hrs = Math.floor(time);
        let mins = Math.round((time - hrs) * 60);

        return hrs+" Hrs "+mins+" Mins"
    }
}

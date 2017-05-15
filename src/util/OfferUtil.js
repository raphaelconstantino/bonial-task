import moment from 'moment';

export class OfferUtil {

    static formatDate (date) {
        if (date)
        {
            return moment(date).fromNow();
        }

        return "";
    }

    static percentageOff (original, reduced) {
        if (!original || !reduced)
        {
            return "0";
        }
        return ( 100 - ((reduced * 100) / original) ).toFixed(0)  + "%";
    }
}
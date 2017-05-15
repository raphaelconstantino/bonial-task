/** Messages */
const isRequired = fieldName => `${fieldName} is required!`;
const isInvalidUrl = () => "Your url is invalid. Please start it with http://";
const isInvalidNumber = () => "Please add a number higher than 0";

/** Rules */
export default class ValidationRules {

    static required (text) {
        if (text) 
        {
            return null;
        } 
        
        return isRequired;
        
    }

    static url (text) {
        let regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!-]))?/;
        if (regexp.test(text))
        {
            return null
        }

        return isInvalidUrl;
    }

    static positiveNumber (val) {
        if (val > 0)
        {
            return;
        }

        return isInvalidNumber;
    }

}

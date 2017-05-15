/** Messages */
const isRequired = fieldName => `${fieldName} is required!`;

/** Rules */
export default class ValidationRules {

    static required (text) {
        if (text) 
        {
            return null;
        } 
        
        return isRequired;
        
    }

}

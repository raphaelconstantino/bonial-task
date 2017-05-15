import {isRequired} from '../util/validationMessages';

export const required = (text) => {
    if (text) {
        return null;
    } 
    
    return isRequired;
    
};
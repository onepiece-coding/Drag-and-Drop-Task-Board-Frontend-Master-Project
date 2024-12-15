import { capitalize } from '../helpers/capitalize';
import { Validation } from './validation_types';

/**
 * @desc Assign pattern validation in inputs
 * @param1 titleValue : string
 * @param2 descriptionValue : string
 * @returns [titleInputRule, descriptionInputRule] : Validation[]
 */
export const assignValidateInputs = (
    titleValue : string, descriptionValue : string
) : Validation[] => {
    const titleInputRule : Validation = {
        type : "title",
        value : titleValue,
        required : true,
        minLength : 7,
        maxLength : 30
    }
    const descriptionInputRule : Validation = {
        type : "description",
        value : descriptionValue,
        required : true,
        minLength : 10,
        maxLength : 100
    }
    return [titleInputRule, descriptionInputRule];
}

/**
 * @desc Handle Validation Errors
 * @param inputRule : Validation
 * @returns Error Message : string
 */
export const handleValidationErrors = (inputRule : Validation) : string => {
    let errorMsg = "";

    // Required
    if (inputRule.required && inputRule.value.trim().length === 0) {
        errorMsg  = capitalize(`${inputRule.type} is required!`);
    }

    // Min Length
    else if (inputRule.minLength && inputRule.value.trim().length < inputRule.minLength) {
        errorMsg  = capitalize(`${inputRule.type} must be at least ${inputRule.minLength} Characters!`);
    }

    // Max Length
    else if (inputRule.maxLength && inputRule.value.trim().length > inputRule.maxLength) {
        errorMsg  = capitalize(`${inputRule.type} must be less than ${inputRule.maxLength} Characters!`);
    }

    return errorMsg;
}

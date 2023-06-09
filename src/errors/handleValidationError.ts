import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';
import config from '../config';

const handleValidationError = (
    err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
        (element: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: element?.path,
                message: element?.message,
            };
        }
    );
    const statusCode = 400;

    return {
        statusCode: statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};

export default handleValidationError;

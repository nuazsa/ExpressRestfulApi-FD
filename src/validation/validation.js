import ResponseError from "../utils/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false
    })
    if (result.error) {
        const errorMessages = result.error.details.map((err) => err.message);
        throw new ResponseError(400, errorMessages);
    } else {
        return result.value;
    }
}

export {
    validate
}
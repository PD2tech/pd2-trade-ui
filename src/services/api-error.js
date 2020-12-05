export class ApiError extends Error {
    constructor(errors) {
        super();
        this.errors = errors.errors || errors;
        console.log('Create ApiError');
        console.log(errors);
    }
}

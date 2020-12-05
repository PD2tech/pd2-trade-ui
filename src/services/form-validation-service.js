export class FormValidationService {
    GetEmailPattern() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; //x@x.xx
    }
}

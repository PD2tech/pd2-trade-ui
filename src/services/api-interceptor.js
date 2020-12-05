import { inject } from 'aurelia-framework';
import { SessionService } from './session-service';
import toastr from 'toastr';

const AUTHORIZATION_HEADER = 'Authorization';

@inject(SessionService)
export class ApiInterceptor {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.notification = toastr;
    }

    request(request) {
        if (!this.sessionService.hasValidSession()) {
            return request;
        }

        if (!request.headers.get(AUTHORIZATION_HEADER)) {
            const bearerToken = `Bearer ${this.sessionService.getToken()}`;
            request.headers.append(AUTHORIZATION_HEADER, bearerToken);
        }

        return request;
    }

    async response(response) {
        switch (response?.status) {
            case 401:
                this.notification.error('You do not have access to this resource. Are you logged in?');
                await this.sessionService.clearSession();
                throw new Error('Please login to continue');
            case 403:
                this.notification.error('You do not have access to this section');
                throw new Error('You do not have access to this section');
            case 404:
                return null;
            case 400:
            case 422:
                const data = await response.json();
                const msg = data.Message || data.message;
                if (msg) {
                    this.notification.error('error', msg.replace(/(?:\r\n|\r|\n)/g, '<br />'));
                }

                if (data.validationErrors) {
                    let errorMsg = '';
                    Object.keys(data.validationErrors).forEach((key, index) => {
                        data.validationErrors[key].forEach(m => {
                            errorMsg += `${m}<br>`;
                        });
                    });
                    this.notification.error(errorMsg);
                }
                throw new Error(msg);
            case 500:
                this.notification.error('Something went wrong. If this error continues, please contact support.');
                throw new Error('Something went wrong. If this error continues, please contact support.');
        }
        return response;
    }
}

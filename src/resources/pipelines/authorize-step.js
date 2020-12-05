import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {SessionService} from 'services/session-service';
import toastr from 'toastr';

@inject(SessionService)
export class AuthorizeStep {
    constructor(sessionService) {
        this.sessionService = sessionService;
        this.notification = toastr;
    }

    async run(navigationInstruction, next) {
        const requiresAuth = navigationInstruction.getAllInstructions().some(i => i.config.settings.auth);
        const isLoggedIn = this.sessionService.isTokenValid();

        if (requiresAuth && !isLoggedIn) {
            return next.cancel(new Redirect('login?redirect_url=' + navigationInstruction.fragment.substr(1)));
        }

        return next();
    }
}

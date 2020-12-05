import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {Router} from 'aurelia-router';
import toastr from 'toastr'
import './manage-trades.scss';

@inject(SessionService, Router)
export class ManageTrades {

    constructor(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
        this.notification = toastr;
    }

    async activate() {
        this.user = await this.sessionService.getProfile();
        if (!this.user) {
            this.notification.info("You must be logged in to view this page.");
            this.router.route('home');
        }
    }
}

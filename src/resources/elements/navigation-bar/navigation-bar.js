import {SessionService} from 'services/session-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import './navigation-bar.scss';

@inject(SessionService, EventAggregator)
export class NavigationBar {
    constructor(sessionService, eventAggregator) {
        this.sessionService = sessionService;
        this.eventAggregator = eventAggregator;
    }

    user;

    async attached() {
        this.user = await this.sessionService.getProfile();
        this.userSubscriber = this.eventAggregator.subscribe('user-updated', payload => {
            this.user = payload.user;
        });
    }

    handleLogoutClick() {
        if (this.user) {
            this.sessionService.logout();
            this.user = null;
        }
    }
}

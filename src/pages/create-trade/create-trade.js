import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {Router} from 'aurelia-router';
import toastr from 'toastr'
import './create-trade.scss';
import Tabs from "devextreme/ui/tabs";

@inject(SessionService, Router)
export class CreateTrade {

    tabsElement;
    tabs = [
        {
            text: 'Import from Stash'
        },
        {
            text: 'Set or Unique'
        },
        {
            text: 'Rare'
        }];
    currentTab = this.tabs[0].text;

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

    attached() {
        new Tabs(this.tabsElement, {
            items: this.tabs,
            selectedIndex: 0,
            onItemClick: this.handleTabUpdate
        });
    }

    handleTabUpdate = (event) => {
        this.currentTab = event.itemData.text;
    }

    createOffer() {

    }
}

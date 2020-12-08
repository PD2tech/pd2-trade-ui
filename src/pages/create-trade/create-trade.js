import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {Router} from 'aurelia-router';
import {ItemService} from 'services/item-service';
import toastr from 'toastr'
import './create-trade.scss';
import Tabs from "devextreme/ui/tabs";

@inject(SessionService, Router, ItemService)
export class CreateTrade {

    tabsElement;
    tabs = [
        {
            text: 'Import Copied Item'
        },
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
    accountName;
    rareItem;
    showPricing = false;

    constructor(sessionService, router, itemService) {
        this.sessionService = sessionService;
        this.router = router;
        this.itemService = itemService;
        this.notification = toastr;
    }

    async activate() {
        this.user = await this.sessionService.getProfile();
        if (!this.user) {
            this.notification.info("You must be logged in to view this page.");
            this.router.route('home');
        }
    }

    async attached() {
        new Tabs(this.tabsElement, {
            items: this.tabs,
            selectedIndex: 0,
            onItemClick: this.handleTabUpdate
        });

        this.currencyItems = await this.itemService.getCurrencyItems();
    }

    handleTabUpdate = (event) => {
        this.currentTab = event.itemData.text;
    }

    createOffer() {
        console.log('offer created');
        console.log(this.rareItem);
    }
}

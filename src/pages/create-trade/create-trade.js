import {inject} from 'aurelia-framework';
import {SessionService} from 'services/session-service';
import {Router} from 'aurelia-router';
import {ItemService} from 'services/item-service';
import {ItemStringParser} from "resources/utilities/item-string-parser";
import {TradeOfferService} from 'services/trade-offer-service';
import toastr from 'toastr'
import './create-trade.scss';
import Tabs from "devextreme/ui/tabs";

@inject(SessionService, Router, ItemService, ItemStringParser, TradeOfferService)
export class CreateTrade {
    constructor(sessionService, router, itemService, itemStringParser, tradeOfferService) {
        this.sessionService = sessionService;
        this.router = router;
        this.itemService = itemService;
        this.itemStringParser = itemStringParser;
        this.tradeOfferService = tradeOfferService;
        this.notification = toastr;
    }

    tabsElement;
    tabObject;
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
            text: 'Rare, Magic, or Normal'
        }];
    currentTab = this.tabs[0].text;

    tradeOffer = {
        cost: null,
        wantedItemId: null,
        wantedItem: null,
        offeredItemId: null,
        offeredItem: null,
        accountName: '',
        note: ''
    }

    itemString;

    async activate() {
        this.user = await this.sessionService.getProfile();
        if (!this.user) {
            this.notification.info("You must be logged in to view this page.");
            this.router.route('home');
        }
    }

    async attached() {
        this.tabObject = new Tabs(this.tabsElement, {
            items: this.tabs,
            selectedIndex: 0,
            onItemClick: this.handleTabUpdate
        });

        this.currencyItems = await this.itemService.getCurrencyItems();
    }

    async handleItemString() {
        if (!this.itemString) {
            return;
        }
        this.parsing = true;
        try {
            let itemFromString = await this.itemStringParser.parseItemJsonString(this.itemString);
            if (itemFromString.type === 'Unique' || itemFromString.type === 'Set') {
                this.currentTab = 'Set or Unique';
            } else if (itemFromString.type === 'Rare' || itemFromString.type === 'Magic' || itemFromString.type === 'Normal') {
                this.currentTab = 'Rare, Magic, or Normal';
            }
            this.tradeOffer.offeredItem = itemFromString;
        } catch(e) {
            console.log(e);
        } finally {
            this.parsing = false;
        }
    }

    handleTabUpdate = (event) => {
        this.currentTab = event.itemData.text;
    }

    async createOffer() {
        if (this.tradeOffer.wantedItem) {
            this.tradeOffer.wantedItemId = this.tradeOffer.wantedItem.id;
        }
        try {
            await this.tradeOfferService.create(this.tradeOffer);
            this.notification.success("Listing Created!");
            this.router.navigate('manage-trades');
        } catch(e) {
            console.log(e);
            this.notification.error("Failed to create listing");
        }
    }
}

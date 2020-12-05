import {inject, observable} from 'aurelia-framework';
import {SeasonService} from 'services/season-service';
import {ItemService} from 'services/item-service';
import {SessionService} from 'services/session-service';
import {ItemStatService} from 'services/item-stat-service';
import {Router} from 'aurelia-router';
import toastr from 'toastr'
import './home.scss';

@inject(SeasonService, ItemService, SessionService, Router, ItemStatService)
export class Home {

    constructor(seasonService, itemService, sessionService, router, itemStatService) {
        this.seasonService = seasonService;
        this.itemService = itemService;
        this.sessionService = sessionService;
        this.itemStatService = itemStatService;
        this.router = router;
        this.notification = toastr;
    }

    nameSearch;

    filtersOpen = true;
    seasons = [];
    selectedSeason;

    @observable searchingStatText;
    selectedStats = [];

    itemCategories = [];
    itemRarities = [];

    filterSelections = [];
    selectedCategory;
    selectedRarity;

    levelMin;
    levelMax;

    strengtMin;
    strengthMax;

    dexMin;
    dexMax;

    sellerAccountName;

    async attached() {
        this.loading = true;
        this.user = await this.sessionService.getProfile();
        this.seasons = await this.seasonService.getAll();
        this.itemCategories = await this.itemService.getCategories();
        this.itemRarities = await this.itemService.getRarities();
        this.selectedSeason = this.seasons[0];
        this.loading = false;
    }

    nameChanged() {
        console.log("Name searched changed");
        console.log(this.nameSearch);
    }

    createOffer() {
        if (!this.user) {
            this.notification.info("You must create an account to create a new trade offer");
            return this.router.navigate('register');
        }
        this.router.navigate('create-trade');
    }

    clearFilters() {
        this.filterSelections = null;
        this.selectedRarity = null;
        this.selectedCategory = null;
        this.levelMin = null;
        this.levelMax = null;
        this.strengthMax = null;
        this.strengtMin = null;
        this.dexMax = null;
        this.dexMin = null;
        this.selectedStats = [];
    }

    handleNewStat(stat) {
        if (stat) {
            this.selectedStats.push(stat)
        }
    }

    search() {

    }

    removeItemStat(stat) {
        let index = this.selectedStats.findIndex(x => x.id === stat.id);
        this.selectedStats.splice(index, 1);
    }
}

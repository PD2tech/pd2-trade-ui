import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class TradeOfferService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'TradeOffer';

    async getMostRecentTradeOffers() {
        return await this.apiService.doGet(this.path);
    }

    async search(data) {
        return await this.apiService.doPost(this.path + '/Search', data);
    }

    async filter(filter) {
        return await this.apiService.doGet(this.path);
    }

    async create(data) {
        return await this.apiService.doPost(this.path, data);
    }
}

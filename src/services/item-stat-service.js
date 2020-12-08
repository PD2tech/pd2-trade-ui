import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ItemStatService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'ItemStat';
    stats;

    async getAllStats() {
        if (!this.stats) {
            this.stats = await this.apiService.doGet(this.path);
        }
        return this.stats;
    }
}

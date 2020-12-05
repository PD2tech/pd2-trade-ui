import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ItemStatService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'ItemStat';

    async getAllStats() {
        return await this.apiService.doGet(this.path);
    }
}

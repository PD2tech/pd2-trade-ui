import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class SeasonService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'Season';

    async getAll() {
        return await this.apiService.doGet(this.path);
    }
}

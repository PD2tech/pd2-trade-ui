import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ItemService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'Item';

    async getCategories() {
        return await this.apiService.doGet(this.path + '/Categories');
    }

    async getRarities() {
        return await this.apiService.doGet(this.path + '/Rarities');
    }

    async getCurrencyItems() {
        return await this.apiService.doGet(this.path + '/Search?expression=IsCurrency == true');
    }

    async getSubcategoryValues(category) {
        return await this.apiService.doGet(this.path + '/SubCategory?category=' + category);
    }
}

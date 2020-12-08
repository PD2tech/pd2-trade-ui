import {inject} from 'aurelia-framework';
import {ApiService} from './api-service';

@inject(ApiService)
export class ItemService {
    constructor(apiService) {
        this.apiService = apiService;
    }

    path = 'Item';
    categories;
    rarities;
    currencyItems;

    async getCategories() {
        if (!this.categories) {
            this.categories = await this.apiService.doGet(this.path + '/Categories');
        }
        return this.categories;
    }

    async getRarities() {
        if (!this.rarities) {
            this.rarities = await this.apiService.doGet(this.path + '/Rarities');
        }
        return this.rarities;
    }

    async getCurrencyItems() {
        if (!this.currencyItems) {
            this.currencyItems = await this.apiService.doGet(this.path + '/Search?expression=IsCurrency == true');
        }
        return this.currencyItems;
    }

    async getSubcategoryValues(category) {
        return await this.apiService.doGet(this.path + '/SubCategory?category=' + category);
    }

    async getCategoryFromSubcategory(subcategory) {
        return await this.apiService.doGet(this.path + '/FindItemCategory?itemSubCategory=' + subcategory)
    }
}

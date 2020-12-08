import {ItemService} from 'services/item-service';
import {inject, bindable} from "aurelia-framework";

@inject(ItemService)
export class CreateRareItem {
    bind(bindingContext) {
        this.parent = bindingContext;
    }

    constructor(itemService) {
        this.itemService = itemService;
    }

    async created() {
        this.itemCategories = await this.itemService.getCategories();
        this.itemRarities = await this.itemService.getRarities();
    }

    itemCategories;
    subCategories;

    @bindable item = {
        name: null,
        levelRequirement: null,
        strengthRequirement: null,
        dexterityRequirement: null,
        itemLevel: null,
        type: 'Rare',
        category: null,
        subCategory: null,
        totalSockets: null,
        minDamage: null,
        maxDamage: null,
        durability: null,
        maxDurability: null,
        defence: null
    }

    @bindable stats = [];

    handleNewStat(stat) {
        if (stat) {
            let found = this.stats.find(x => x.id === stat.id);
            if (!found) {
                this.item.stats.push(stat)
            }
        }
    }

    async handleCategoryChange(event) {
        this.subCategories = await this.itemService.getSubcategoryValues(event?.detail?.value);
    }

    removeItemStat(stat) {
        let index = this.stats.findIndex(x => x.id === stat.id);
        this.stats.splice(index, 1);
    }
}

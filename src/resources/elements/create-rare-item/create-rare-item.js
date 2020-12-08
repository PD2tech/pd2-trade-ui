import {ItemService} from 'services/item-service';
import Tabs from 'devextreme/ui/tabs';
import {inject} from "aurelia-framework";

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
    }

    itemCategories;
    subCategories;

    item = {
        name: '',
        levelRequirement: 0,
        strengthRequirement: 0,
        dexterityRequirement: 0,
        itemLevel: 0,
        type: 'Rare',
        category: '',
        subCategory: '',
        totalSockets: 0,
        minDamage: 0,
        maxDamage: 0,
        durability: 0,
        maxDurability: 0,
        defence: 0,
        stats: []
    }

    handleNewStat(stat) {
        if (stat) {
            let found = this.item.stats.find(x => x.id === stat.id);
            if (!found) {
                this.item.stats.push(stat)
            }
        }
    }

    async handleCategoryChange() {
        if (this.item.category) {
            this.subCategories = await this.itemService.getSubcategoryValues(this.item.category);
        }
    }

    removeItemStat(stat) {
        let index = this.item.stats.findIndex(x => x.id === stat.id);
        this.item.stats.splice(index, 1);
    }
}

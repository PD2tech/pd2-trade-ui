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
        this.itemRarities = await this.itemService.getRarities();
    }

    item = {
        name: '',
        levelRequirement: 0,
        strengthRequirement: 0,
        dexterityRequirement: 0,
        itemLevel: 1,
        type: '',
        category: '',
        totalSockets: 0,
        minDamage: 0,
        maxDamage: 0,
        durability: 0,
        maxDurability: 0
    }

    stats = [];

    finishItem() {

    }

    handleNewStat(stat) {
        if (stat) {
            let found = this.stats.find(x => x.id === stat.id);
            if (!found) {
                this.stats.push(stat)
            }
        }
    }

    removeItemStat(stat) {
        let index = this.stats.findIndex(x => x.id === stat.id);
        this.stats.splice(index, 1);
    }
}

import {inject} from "aurelia-framework";
import {ItemStatService} from 'services/item-stat-service';
import {ItemService} from 'services/item-service';
import toastr from 'toastr';

@inject(ItemStatService, ItemService)
export class ItemStringParser {
    constructor(itemStatService, itemService) {
        this.itemStatService = itemStatService;
        this.itemService = itemService;
        this.notification = toastr;
    }

    async parseItemJsonString(string) {
        this.allStats = await this.itemStatService.getAllStats();
        let item = {};
        let json = JSON.parse(string);
        item.name = json.name;
        item.itemLevel = json.iLevel;
        item.type = json.quality;
        item.defence = json.defense;
        item.totalSockets = json.sockets;
        item.sockets = json.socketed;
        item.subCategory = json.type;
        item.category = await this.itemService.getCategoryFromSubcategory(json.type);
        item.stats = [];
        for (let stat of json.stats) {
            let foundStat = null;
            if (stat.skill) {
                foundStat = this.allStats.find(x => x.name === stat.name && x.skill === stat.skill);
            } else {
                foundStat = this.allStats.find(x => x.name === stat.name);
            }
            if (foundStat) {
                foundStat.value = stat.value;
                item.stats.push(foundStat);
            }
        }
        console.log(item);
        this.notification.info("Check everything as some stats may not have been added.", "Item Imported")
        return item;
    }
}

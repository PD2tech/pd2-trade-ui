import {bindable, inject} from 'aurelia-framework';
import {ItemStatService} from 'services/item-stat-service';
import SelectBox from "devextreme/ui/select_box";
import ArrayStore from "devextreme/data/array_store";

@inject(ItemStatService)
export class StatSelector {
    bind(bindingContext) {
        this.parent = bindingContext;
    }

    constructor(itemStatService) {
        this.itemStatService = itemStatService;
    }

    @bindable statSelectedFunction;
    searchingStatText;

    async attached() {
        this.originalStats = await this.itemStatService.getAllStats();
        this.selectBox = this.createSelectBox();
    }

    createSelectBox() {
        let selectElement = document.getElementById('stat-selector');
        if (!selectElement) {
            return;
        }
        return new SelectBox(selectElement, {
            dataSource: new ArrayStore({
                data: this.originalStats,
                key: "id"
            }),
            placeholder: '+ Add Stat Filter',
            displayExpr: "displayName",
            searchEnabled: true,
            stylingMode: 'filled',
            height: 46,
            onValueChanged: (data) => {
                this.handleValueChange(data);
            },
        })
    }

    handleValueChange(data) {
        this.parent?.handleNewStat(data?.value);
        this.selectBox?.reset();
    }
}

import {bindable} from "aurelia-framework";

export class ItemImage {
    @bindable item;

    getImageForCategory() {
        return 'https://via.placeholder.com/100x150?text=No+Item+Image+Found';
    }
}

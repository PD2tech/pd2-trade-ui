import {bindable} from 'aurelia-framework';
import './min-max-selector.scss';
export class MinMaxSelector {
    @bindable min;
    @bindable max;
    @bindable label;
    @bindable full;
    @bindable removeFunction;

    remove() {
        this.removeFunction();
    }
}

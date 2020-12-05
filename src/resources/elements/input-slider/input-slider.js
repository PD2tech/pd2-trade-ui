import {bindable, bindingMode, inject} from 'aurelia-framework';
import './input-slider.scss';

@inject(Element)
export class RangeSlider {

    @bindable({defaultBindingMode: bindingMode.oneTime}) min = 0;
    @bindable({defaultBindingMode: bindingMode.oneTime}) max = 100;
    @bindable({defaultBindingMode: bindingMode.oneTime}) step = 1;
    @bindable({defaultBindingMode: bindingMode.twoWay}) value;

    constructor(element) {
        this.element = element;
    }

}

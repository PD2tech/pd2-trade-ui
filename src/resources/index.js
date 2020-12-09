import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./elements/authenticate-form/authenticate-form'),
        PLATFORM.moduleName('./elements/create-rare-item/create-rare-item'),
        PLATFORM.moduleName('./elements/error-list/error-list.html'),
        PLATFORM.moduleName('./elements/footer/footer'),
        PLATFORM.moduleName('./elements/item-image/item-image'),
        PLATFORM.moduleName('./elements/item-viewer/item-viewer'),
        PLATFORM.moduleName('./elements/input-slider/input-slider'),
        PLATFORM.moduleName('./elements/min-max-selector/min-max-selector'),
        PLATFORM.moduleName('./elements/navigation-bar/navigation-bar'),
        PLATFORM.moduleName('./elements/stat-selector/stat-selector'),

        // Value Converters
        PLATFORM.moduleName('./value-converters/crypto-name-formatter'),
        PLATFORM.moduleName('./value-converters/currency-formatter'),
        PLATFORM.moduleName('./value-converters/date-formatter'),
        PLATFORM.moduleName('./value-converters/format-html'),
        PLATFORM.moduleName('./value-converters/format-from-html'),
        PLATFORM.moduleName('./value-converters/full-name'),
        PLATFORM.moduleName('./value-converters/keys'),
        PLATFORM.moduleName('./value-converters/number-formatter'),
        PLATFORM.moduleName('./value-converters/pascal-case-formatter'),
        PLATFORM.moduleName('./value-converters/proper-case'),
        PLATFORM.moduleName('./value-converters/stat-replacer'),
        PLATFORM.moduleName('./value-converters/time-formatter'),
    ]);
}

import 'regenerator-runtime/runtime';
import * as environment from '../config/environment.json';
import {HttpClient} from 'aurelia-fetch-client';
import {ApiInterceptor} from 'services/api-interceptor';
import {PLATFORM} from 'aurelia-pal';
import 'styles/styles.scss';
import 'bootstrap';
import 'devextreme/dist/js/dx.web';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-animator-css'))
        .plugin(PLATFORM.moduleName('@aurelia-mdc-web/all'))
        .feature(PLATFORM.moduleName('resources/index'));

    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

    aurelia.container.get(HttpClient).configure(config => {
        config
            .withBaseUrl(environment.apiEndpoint)
            .withInterceptor(aurelia.container.get(ApiInterceptor))
            .withDefaults({
                headers: {
                    'Accept': 'application/json'
                }
            });
    });

    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}

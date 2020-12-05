import {inject} from 'aurelia-framework';
import {Router, activationStrategy} from 'aurelia-router';

@inject(Router)
export class Auth {
    constructor(router) {
        this.router = router;
    }

    determineActivationStrategy() {
        return activationStrategy.replace;
    }

    registering = false;

    attached() {
        this.route = this.router.currentInstruction?.config?.route;
        if (this.route === 'register') {
            this.registering = true;
        }
    }
}

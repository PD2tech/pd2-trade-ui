import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-framework';
import { AuthorizeStep } from 'resources/pipelines/authorize-step';
import { MetadataStep } from 'resources/pipelines/metadata-step';
import { ScrollPageStep } from 'resources/pipelines/scroll-page-step';
import { SessionService } from 'services/session-service';

@inject(Router, SessionService)
export class App {
    constructor(router, sessionService) {
        this.sessionService = sessionService;
        this.router = router;
    }

    async activate() {
        this.user = await this.sessionService.getProfile();
    }

    configureRouter(config, router) {
        config.options.pushState = true;
        config.title = 'PD2 Trade UI';
        config.addAuthorizeStep(AuthorizeStep);
        config.addPreActivateStep(ScrollPageStep);
        config.addPreRenderStep(MetadataStep);
        config.map([
            {
                route: ['', 'home'],
                name: 'home',
                moduleId: PLATFORM.moduleName('pages/home/home'),
                title: 'Home'
            },
            {
                route: ['login', 'register'],
                name: 'login',
                moduleId: PLATFORM.moduleName('pages/auth/auth'),
                title: 'Authenticate'
            },
            {
                route: 'manage-trades',
                name: 'manage-trades',
                moduleId: PLATFORM.moduleName('pages/manage-trades/manage-trades'),
                title: 'Manage Trades'
            },
            {
                route: 'create-trade',
                name: 'create-trade',
                moduleId: PLATFORM.moduleName('pages/create-trade/create-trade'),
                title: 'Create Trade'
            }
        ]);

        config.mapUnknownRoutes(() => {
            return { redirect: '' };
        });

        this.router = router;
    }
}

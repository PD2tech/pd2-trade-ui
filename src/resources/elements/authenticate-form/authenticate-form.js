import { bindable , inject, NewInstance} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { validateTrigger, ValidationController, ValidationRules } from 'aurelia-validation';
import { SessionService } from 'services/session-service';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ValidationRenderer } from 'resources/validation-renderer';
import toastr from 'toastr';
import './authenticate-form.scss';

@inject(Router, NewInstance.of(ValidationController), SessionService, EventAggregator)
export class AuthenticateForm {
    constructor(router, validationController, sessionService, eventAggregator) {
        this.router = router;
        this.validator = validationController;
        this.validator.addRenderer(new ValidationRenderer());
        this.sessionService = sessionService;
        this.eventAggregator = eventAggregator;
        this.validator.validateTrigger = validateTrigger.blur;
        this.notification = toastr;

        ValidationRules
            .ensure('email').required().email()
            .ensure('password').required().minLength(8).matches(/[0-9]/).withMessage('Password must include a digit')
            .ensure('confirmPassword').required().minLength(8).matches(/[0-9]/).withMessage('Password must include a digit')
            .on(this.user);
    }

    @bindable registering = false;

    user = {
        email: '',
        password: '',
        confirmPassword: ''
    };
    errors;

    async signin() {
        this.errors = null;

        const result1 = await this.validator.validate({ object: this.user, propertyName: 'email' });
        const result2 = await this.validator.validate({ object: this.user, propertyName: 'password' });
        if (!result1.valid || !result2.valid) {
            return;
        }

        this.loading = true;

        try {
            let response = await this.sessionService.login(this.user);
            this.eventAggregator.publish('user-updated', { user: await this.sessionService.getProfile() });
            this.router.navigate('home');
        } catch (e) {
            console.log(e);
            this.errors = {error: {message: 'Invalid Login'}};
        } finally {
            this.loading = false;
        }

        this.isRequesting = false;
    }

    async register() {
        this.errors = null;

        const result = await this.validator.validate();
        if (!result.valid) {
            return;
        }

        if (this.user.password !== this.user.confirmPassword) {
            this.errors = {error: {message: 'Passwords do not match'}};
        }

        this.loading = true;

        try {
            await this.sessionService.register(this.user);
            this.notification.info("User created. Start trading!");
            this.router.navigate('home');
        } catch (e) {
            console.log(e);
            this.errors = {error: {message: 'Invalid Registration'}};
        } finally {
            this.loading = false;
        }

        this.isRequesting = false;
    }
}

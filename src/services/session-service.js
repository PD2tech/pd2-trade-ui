import {inject, bindable} from 'aurelia-framework';
import {ApiService} from './api-service';
import {EventAggregator} from 'aurelia-event-aggregator';

const TOKEN_KEY = 'jwt_token';

@inject(ApiService, EventAggregator)
export class SessionService {
    currentUser = null;

    constructor(apiService, eventAggregator) {
        this.apiService = apiService;
        this.eventAggregator = eventAggregator;
    }

    setCurrentUser(user) {
        if (!user) {
            return;
        }
        this.currentUser = user;
        this.eventAggregator.publish('user-updated', { user: user });
    }

    async register(data) {
        let response = await this.apiService.doPost('User', data);
        if (!response) {
            return;
        }
        this.setCurrentUser(response);
        this.saveToken(response.token);
        return response;
    }

    async login(data) {
        let response = await this.apiService.doPost('', data);
        if (!response) {
            return;
        }
        this.setCurrentUser(response);
        this.saveToken(response.token);
        return response;
    }

    async logout() {
        let response = await this.apiService.doDelete('Logout');
        this.destroyToken();
        this.setCurrentUser(null);
        return response;
    }

    async getProfile() {
        if (this.isTokenValid()) {
            if (this.currentUser) {
                return this.currentUser;
            }
            let response = await this.apiService.doGet('Profile');
            this.setCurrentUser(response);
            return response;
        }
    }

    saveToken(token) {
        window.localStorage[TOKEN_KEY] = token;
    }

    getToken() {
        return window.localStorage[TOKEN_KEY];
    }

    destroyToken() {
        window.localStorage.removeItem(TOKEN_KEY);
    }

    isTokenValid() {
        const token = this.getToken();
        return token && token !== '' && token !== undefined && token !== 'undefined';
    }

    getAuthorizationHeader() {
        if (this.isTokenValid()) {
            return `Bearer ${this.getToken()}`;
        }
    };

    hasValidSession() {
        const token = this.getToken();
        return token && token !== '' && token !== undefined && token !== 'undefined' && token !== 'null';
    }
}

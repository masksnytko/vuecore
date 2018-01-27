'use strict';

const Page = require('../page');

class Pages {
    constructor(defaultPage) {
        this.defaultPage = defaultPage;
        this._defaultPageHash = '#' + defaultPage.constructor.name.toLowerCase();
        this.base = document.createElement('div');
        this.add(defaultPage);
        window.addEventListener('hashchange', this.hashchange.bind(this));
    }
    hashchange() {
        let page = this[location.hash];
        if (page instanceof Page) {
            this._activePage(page);
        } else {
            location.hash = this._defaultPageHash;
        }
    }
    add(page) {
        if (page instanceof Page) {
            this['#' + page.constructor.name.toLowerCase()] = page;
            this.base.appendChild(page.base);
        } else {
            throw page;
        }
    }
    _activePage(page) {

        if (this.lastActive !== undefined) {
            this.lastActive.display(false);
        }

        this.lastActive = page;
        page.display();
    }
}

module.exports = Pages;
'use strict';

class Page {
    constructor() {
        this.base = document.createElement('div');
        this.base.style.display = 'none';
    }
    display(v = true) {
        if (v === false) {
            this.base.style.display = 'none';
        } else {
            this.base.style.removeProperty('display');
        }
    }
    appendChild(v) {
        if (v instanceof Element) {
            this.base.appendChild(v);
        } else if (v.base instanceof Element) {
            this.base.appendChild(v.base);
        }
    }
}

module.exports = Page;
'use strict'

require('./index.css');

const Core = require('../core');

class Item extends Core {
    constructor(name, separator = '/') {
        super(`<div>${separator}<a>${name}</a></div>`);
    }
}

class Path {
    constructor(first) {
        this.base = document.createElement('div');
        this.base.className = 'path';
        this.add(new Item(first, ''));
        this.base.addEventListener('click', e => {
            if (e.path[2] === this.base) {
                while (this.base.lastChild !== e.path[1]) {
                    this.base.removeChild(this.base.lastChild);
                }
            }
        });
    }
    add(item) {
        this.base.appendChild(item.base);
    }
}

module.exports = Path;
module.exports.Item = Item;
'use strict';

require('./index.css');

const Core = require('../core');

class IconUser extends Core {
    constructor(data) {
        super(`<div class="icon-user">
            ${data.balance !== undefined?'<a #balance></a>':''}
            <a>${data.name}</a>
            <img src=${data.src}>
        </div>`);
    }
}

class Item extends Core {
    constructor(name, hash) {
        super(`<div :onclick="click" class="item">${name}</div>`);
        this.hash = '#' + hash.toLowerCase();
    }
    click() {
        location.hash = this.hash;
    }
}

class Header extends Core {
    constructor(logo) {
        super(`<header>
            <div class="logo" :onclick="clickLogo">${logo}</div>
            <div class="items" #items></div>
        </header>`);
        window.addEventListener('hashchange', this.hashchange.bind(this));
    }
    hashchange() {

        if (this.lastActive !== undefined) {
            this.lastActive.base.className = 'item';
        }

        let item = this[location.hash];

        if (item instanceof Item) {
            item.base.className = 'item active';
            this.lastActive = item;
        }
    }
    clickLogo() {

        if (this.lastActive !== undefined) {
            this.lastActive.base.className = 'item';
        }

        location.hash = '';
    }
    add(item) {
        this.el.items.appendChild(item.base);
        this[item.hash] = item;
    }
    setIconUser(iconUser) {
        this.base.appendChild(iconUser.base);
    }
}

module.exports = Header;
module.exports.Item = Item;
module.exports.IconUser = IconUser;
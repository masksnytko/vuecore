'use strict';

const Core = require('vuecore/core');
const Helper = require('../helper');

require('./index.css');

class InfoBox extends Core {
    constructor(name, description, factorWidth) {

        super(`<div class="info-box">
        <h1 #value></h1>
        <p>${name}</p>
        </div>`);

        if (description !== undefined) {
            this.base.appendChild(new Helper(name, description).base);
        }

        if (factorWidth !== undefined) {
            this.base.style.minWidth = 200 * factorWidth + 10 * (factorWidth - 1);
            this.base.style.maxWidth = this.base.style.minWidth;
        }
    }
    set value(v) {
        this._value = v;
        this.el.value.textContent = v;
    }
    get value() {
        return this._value;
    }
}

module.exports = InfoBox;
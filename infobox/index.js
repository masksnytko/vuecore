const Core = require('vuecore/core');
const Helper = require('../helper');

require('./index.css');

class InfoBox extends Core {
    constructor(name, description) {
        super(`<div class="info-box">
        <h1 #value></h1>
        <p>${name}</p>
        </div>`);
        
        if (description !== undefined) {
            this.base.appendChild(new Helper(name, description).base);
        }
    }
    set value(v) {
        this.el.value.textContent = v;
    }
}

module.exports = InfoBox;
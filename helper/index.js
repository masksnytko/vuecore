const Core = require('vuecore/core');

require('./index.css');

class Helper extends Core {
    constructor(name, description) {
        super('<div class="helper" :onclick="click"></div>');
        this.name = name;
        this.description = description;
    }
    click(event) {
        let popup = new Core(`<div class="helper-popup">
        <div>${this.name}</div>
        <div>${this.description}</div>
        </div>`);

        document.addEventListener('mousedown', function handler() {
            document.removeEventListener('mousedown', handler);
            popup.base.parentNode.removeChild(popup.base);
        });
        this.base.parentNode.appendChild(popup.base);
        
        if (event.pageX + popup.base.offsetWidth + 40 > window.innerWidth) {
            popup.base.style.left = this.base.parentNode.offsetWidth-popup.base.offsetWidth - 40;
        }
    }
}

module.exports = Helper;
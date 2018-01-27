'use strinct'

require('./index.css');

class Button {
    constructor(text, width = 150) {
        this.base = document.createElement('button');
        this.base.style.width = width + 'px';
        this.base.textContent = text;
        this.base.className = 'normal';
        this.text = text;
    }
    on(type, cb) {
        this.base.addEventListener(type, cb); 
    }
    setNormal() {
        this._setState('normal', this.text);
    }
    setDuring(text) {
        this._setState('during', text);
    }
    setError(text) {
        this._setState('error', text, true);
    }
    setDone(text) {
        this._setState('done', text, true);
    }
    setDisable(text) {
        this._setState('disable', text);
    }
    _setState(state, text, setNormal = false, timeout = 2000) {
        
        this.base.className = state;
        this.base.textContent = text;

        if (state === 'normal') {
            this.base.disabled = false;
        } else {
            this.base.disabled = true;
        }

        if (setNormal === true) {
            setTimeout(() => {
                this.setNormal();
            }, timeout);
        }
    }
};

module.exports = Button;
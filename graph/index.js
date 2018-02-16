'use strict';

require('./index.css');

const Core = require('../core');

class Graph extends Array {
    constructor(options) {
        super();
        
        this.step = options.step;
        this.width = options.width;
        this.height = options.height;
        this.fTitle = options.title;
        this.fScaleX = options.scaleX;
        this.fScaleY = options.scaleY;
        this._lastRender = 0;

        Core.call(this, `<div class="graph">
        <svg height="${this.height + 8}" width="${this.width + 8}" viewbox="-4 -4 ${this.width + 8} ${this.height + 8}" shape-rendering="geometricPrecision">
            <g #grid></g>
            <polygon class="fill" #polygon></polygon>
            <polyline class="line" #polyline></polyline>
            <g #circles></g>
        </svg>
        <ul class="scalex" #scalex></ul>
        <ul class="scaley" #scaley></ul>
        <div class="title" #title></div>
        <div class="hovers" #hovers></div>
        </div>`);
    }
    _initGrid() {
        
        this.el.grid.innerHTML = '';

        for (var i = 1; i * this.step < this.width; i++) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            el.setAttribute('class', 'line-sw02');
            el.setAttribute('x1', i * this.step);
            el.setAttribute('y1', 0);
            el.setAttribute('x2', i * this.step);
            el.setAttribute('y2', this.height);
            this.el.grid.appendChild(el);
        }

        for (var i = 1; i * this.step < this.height; i++) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            el.setAttribute('class', 'line-sw02');
            el.setAttribute('x1', 0);
            el.setAttribute('y1', i * this.step);
            el.setAttribute('x2', this.width);
            el.setAttribute('y2', i * this.step);
            this.el.grid.appendChild(el);
        }
    }
    _initMinMax() {
        this.minX = Infinity;
        this.minY = Infinity;
        this.maxY = -Infinity;
        this.maxX = -Infinity;

        for (var i = 0; i < this.length; i++) {
            this.minX = Math.min(this.minX, this[i].x);
            this.minY = Math.min(this.minY, this[i].y);
            this.maxX = Math.max(this.maxX, this[i].x);
            this.maxY = Math.max(this.maxY, this[i].y);
        }
    }
    _initScale() {
        this.el.scaley.innerHTML = '';
        this.el.scalex.innerHTML = '';
        
        var delta = (this.maxY - this.minY) / (this.height / this.step);
        for (var i = 0; delta * i < this.maxY - this.minY && delta > 0; i++) {
            var el = document.createElement('li');
            var content = this.maxY - delta * i;
            el.textContent = typeof this.fScaleY === 'function' ? this.fScaleY(content, el) : content.toFixed(0);
            el.style.top = this.step * i;
            this.el.scaley.appendChild(el);
        }

        var delta = (this.maxX - this.minX) / (this.width / this.step);
        for (var i = 0; delta * i <= this.maxX - this.minX && delta > 0; i++) {
            var el = document.createElement('li');
            var content = delta * i + this.minX;
            el.textContent = typeof this.fScaleX === 'function' ? this.fScaleX(content, el) : content.toFixed(0);
            el.style.left = this.step * i;
            this.el.scalex.appendChild(el);
        }
    }
    render() {
        if (Date.now() - this._lastRender < 2000) {
            if (this._timer === undefined) {
                this._timer = setTimeout(() => {
                    this.render();
                }, 3000);
            } else {
                clearTimeout(this._timer);
                this._timer = undefined;
            }
            return;
        }

        this._lastRender = Date.now();

        this._initGrid();
        this._initMinMax();
        this._initScale();

        let points = '';
        this.el.circles.innerHTML = '';
        this.el.hovers.innerHTML = '';

        for (let i = 0; i < this.length; i++) {
            let x = (this[i].x - this.minX) / (this.maxX - this.minX) * this.width;
            let y = this.height - (this[i].y - this.minY) / (this.maxY - this.minY) * this.height;

            if (isNaN(x) === true) {
                x = 0;
            }
            if (isNaN(y) === true) {
                y = this.height;
            }

            points += `${x},${y} `;

            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', 3);

            let hover = document.createElement('div');
            hover.style.height = this.height;
            hover.className = 'hover';
            hover.style.left = x;
            hover.addEventListener('mouseover', e => {
                this.el.title.style.display = 'block';
                this.el.title.style.left = x;
                this.el.title.style.top = y;
                this.el.title.textContent = typeof this.fTitle === 'function' ? this.fTitle(this[i], this.el) : this[i].y;
                circle.style.fill = 'rgb(88, 88, 88)';
            });
            hover.addEventListener('mouseout', e => {
                this.el.title.style.display = 'none'
                circle.style.fill = '#fff';
            });

            this.el.circles.appendChild(circle);
            this.el.hovers.appendChild(hover);
        }

        this.el.polyline.setAttribute('points', points);
        this.el.polygon.setAttribute('points', '0,' + this.height + ' ' + points + this.width + ',' + this.height);
    }
}

module.exports = Graph;
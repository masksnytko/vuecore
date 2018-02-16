'use strinct';

class Layer {
	constructor() {

		this._layer = document.createElement('div');
		this._layer.style.position = 'absolute';
		this._layer.style.minWidth = '100vw';
		this._layer.style.minHeight = '100vh';
		
		this._layer.style.zIndex = Layer.count * 100;

		this.base = this._layer;

		Layer[Layer.count] = this;
		Layer.count++;

		document.body.appendChild(this._layer);
	}
	blur(v = 5) {
		this._layer.style.filter = `blur(${v}px)`;
	}
	unblur() {
		this._layer.style.removeProperty('filter');
	}
	display(v = true) {
		if (v === false) {
			this._layer.style.display = 'none';
		} else {
			this._layer.style.removeProperty('display');
		}
	}
	setBackground(v) {
		this._layer.style.background = v;
	}
	appendChild(v) {
		if (v.base instanceof Element) {
			this._layer.appendChild(v.base);
		} else {
			this._layer.appendChild(v);
		}
	}
}

Layer.count = 0;

module.exports = Layer;
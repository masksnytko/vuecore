'use strict';

const factory = document.createElement('div');

function Core(template) {

    if (typeof template === 'string') {
        factory.innerHTML = template;
        template = factory.children[0];
    }

    if (template instanceof Element) {
        this.el = {};
        this._data = {};
        this.base = template;
        bind.call(this, template);
    } else {
        throw new Error('Core: ' + template);
    }
}

function bind(node) {
    for (var i = 0; i < node.attributes.length; i++) {
        let { name, value } = node.attributes[i];
        var type = name[0];

        if (type === ':' || type === '#') {
            name = name.slice(1);
        } else {
            continue;
        }

        if (type === '#') {
            this.el[name] = node;
        } else {
            var v = this[value];

            if (typeof v === 'function') {
                node[name] = v.bind(this);
            } else {
                Object.defineProperty(this, value, {
                    get() {
                        return this._data[value];
                    },
                    set(v) {
                        this._data[value] = v;
                        node.setAttribute(name, v);
                    }
                });
                this[value] = v;
            }
        }
    }

    for (var i = 0; i < node.children.length; i++) {
        bind.call(this, node.children[i]);
    }
}

module.exports = Core;
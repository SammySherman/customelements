import css from './style.scss';
import html from './index.html';

export default class KgButton extends HTMLElement {
    get disabled() {
        return this.getBooleanAttribute('disabled');
    }
    set disabled(val) {
        this.updateAttribute(this, 'disabled', val);
        this.updateAttribute(this.button, 'disabled', val);
    }

    get appearance() {
        return this.getAttribute('appearance');
    }
    set appearance(val) {
        this.updateAttribute(this, 'appearance', val);
        this.updateAttribute(this.ripple, 'appearance', /icon/.test(val) ?  'center' : 'mouse');
    }
    get color() {
        return this.getAttribute('color');
    }
    set color(val) {
        if (!!val) this.setAttribute('color', val);
        else this.removeAttribute('color');
    }

    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
        this.ripple = this.shadowRoot.querySelector('kg-ripple');
        this.button = this.shadowRoot.querySelector('button');
        this.disabled = this.disabled;
        this.color = this.color;
        this.appearance = this.appearance;
    }
    getBooleanAttribute(name) {
        return this.hasAttribute(name) && this.getAttribute(name) !== 'false'
    }
    updateAttribute(target, name, value) {
        if (value !== undefined && value !== null && value !== false) target.setAttribute(name, value);
        else target.removeAttribute(name);
    }
}
try {
    customElements.define('kg-button', KgButton);
} catch (e) {
}

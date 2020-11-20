import css from './style.scss';
import html from './index.html';

export default class KgButton extends HTMLElement {
    get disabled() {
        return this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false';
    }
    set disabled(val) {
        if(val) this.setAttribute('disabled', val);
        else this.removeAttribute('disabled');
    }

    get appearance() {
        return this.getAttribute('appearance');
    }
    set appearance(val) {
        if (!!val) {
            this.setAttribute('appearance', val);
            this.ripple.setAttribute('mode',  /icon/.test(val) ?  'center' : 'mouse');
        }
        else this.removeAttribute('appearance');
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
        this.disabled = this.disabled;
        this.color = this.color;
        this.appearance = this.appearance;
    }
}
try {
    customElements.define('kg-button', KgButton);
} catch (e) {
}

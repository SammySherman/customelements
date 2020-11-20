import css from './style.scss';
import html from './index.html';

class RadioButtonGroup extends HTMLElement {
    get disabled() {
        return this.getBooleanAttribute('disabled');
    }
    set disabled(val) {
        this.updateAttribute(this, 'disabled', val);
        this.querySelectorAll('kg-radio-button')
            .forEach(x => this.updateAttribute(x, 'disabled', val));
    }
    constructor() {
        super();
    }
    connectedCallback() {
        this.addEventListener('load', e => console.log('loaded', e));
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
        this.addEventListener('mouseup', e => {
           if (e.target !== this.selected) {
               this.selected?.removeAttribute('checked');
               this.selected = e.target;
           }
        });

        this.disabled = this.disabled;
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
  customElements.define('kg-radio-button-group', RadioButtonGroup);
} catch (e) {
}


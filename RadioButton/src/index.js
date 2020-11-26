import css from './style.scss';
import html from './index.html';

class KgRadioButton extends HTMLElement {
    get disabled() {
        return this.getBooleanAttribute('disabled');
    }
    set disabled(val) {
        this.updateAttribute(this, 'disabled', val);
        this.updateAttribute(this.radiobutton, 'disabled', val);
    }
    get align() {
        return this.getAttribute('align');
    }
    set align(val) {
        this.updateAttribute(this, 'align', val);
    }
    get checked() {
        return this.getBooleanAttribute('checked');
    }
    set checked(val) {
        this.updateAttribute(this, 'checked', val);
        this.updateAttribute(this.radiobutton, 'checked', val);
    }
    get name() {
        return this.getAttribute('name');
    }
    set name(val) {
        this.updateAttribute(this,'name', val);
        this.updateAttribute(this.radiobutton,'name', val);
    }
    get value() {
        return this.getAttribute('value');
    }
    set value(val) {
        this.updateAttribute(this,'value', val);
        this.updateAttribute(this.radiobutton,'value', val);
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
        this.radiobutton = this.shadowRoot.querySelector('input');
        this.overlay = this.shadowRoot.querySelector('.overlay');
        this.label = this.shadowRoot.querySelector('label');
        this.ripple = this.shadowRoot.querySelector('kg-ripple');
        this.radiobutton.addEventListener('click', e => !this.disabled && (this.checked = true));
        this.overlay.addEventListener('click', e => !this.disabled && (this.checked = true));
        this.label.addEventListener('click', e => this.ripple.trigger(this.overlay));
        this.disabled = this.disabled;
        this.align = this.align;
        this.checked = this.checked;
        this.name = this.name;
        this.value = this.value;
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
    customElements.define('kg-radio-button', KgRadioButton);
} catch (e) {
}
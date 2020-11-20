import css from './style.scss';
import html from './index.html';

class KgCheckbox extends HTMLElement {
    get disabled() {
        return this.getBooleanAttribute('disabled');
    }
    set disabled(val) {
        this.updateAttribute(this, 'disabled', val);
        if (!!this.checkbox) this.checkbox.disabled = this.disabled;
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
        if (val && this.indeterminate) this.indeterminate = false;
        if (!!this.checkbox) this.checkbox.checked = this.checked;
    }
    get indeterminate() {
        return this.getBooleanAttribute('indeterminate');
    }
    set indeterminate(val) {
        this.updateAttribute(this, 'indeterminate', val);
        if (val && this.checked) this.checked = false;
    }
    get value() {
        return this.getAttribute('value');
    }
    set value(val) {
        this.updateAttribute(this, 'value', val);
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
        this.checkbox = this.shadowRoot.querySelector('input');
        this.overlay = this.shadowRoot.querySelector('.overlay');
        this.label = this.shadowRoot.querySelector('label');
        this.ripple = this.shadowRoot.querySelector('kg-ripple');
        this.checkbox.addEventListener('click', e => !this.disabled && (this.checked = !this.checked));
        this.overlay.addEventListener('click', e => !this.disabled && (this.checked = !this.checked));
        this.label.addEventListener('click', e => this.ripple.trigger(this.overlay));
        this.disabled = this.disabled;
        this.align = this.align;
        this.checked = this.checked;
        this.indeterminate = this.indeterminate;
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
    customElements.define('kg-checkbox', KgCheckbox);
} catch (e) {
}
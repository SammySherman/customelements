import css from './style.scss';
import html from './index.html';

class KgInput extends HTMLElement {
    get disabled() {
        return this.getBooleanAttribute('disabled');
    }
    set disabled(val) {
        this.updateAttribute(this, 'disabled', val);
        this.updateAttribute(this.input, 'disabled', val);
    }
    get value() {
        return this.input.value;
    }
    set value(val) {
        this.updateAttribute(this, 'value', val);
        this.updateAttribute(this.input, 'value', val);
        this.onValueUpdated();
    }
    get type() {
        return this.getAttribute('type');
    }
    set type(val) {
        this.updateAttribute(this, 'type', val);
        this.updateAttribute(this.input, 'type', val);
    }
    get placeholder() {
        return this.getAttribute('placeholder');
    }
    set placeholder(val) {
        this.updateAttribute(this, 'placeholder', val);
        this.updateAttribute(this.input, 'placeholder', val);
    }
    get appearance() {
        return this.getAttribute('appearance');
    }
    set appearance(val) {
        this.updateAttribute(this, 'appearance', val);
    }
    get required() {
        return this.getAttribute('required');
    }
    set required(val) {
        this.updateAttribute(this, 'required', val);
        this.updateAttribute(this.input, 'required', val);
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
        this.input = this.shadowRoot.querySelector('input');
        this.container = this.shadowRoot.querySelector('.container');
        this.error = this.shadowRoot.querySelector('.error');
        this.input.addEventListener('input', e => this.onValueUpdated());
        this.input.addEventListener('focus', e => {
            this.container.classList.add('focused');
            if (!this.touched) {
                this.touched = true;
                this.container.classList.add('touched');
            }
            if (this.input.validity.valid) this.container.classList.remove('has-error');
            else this.container.classList.add('has-error');
        });
        this.input.addEventListener('blur', e => this.container.classList.remove('focused'));
        this.input.addEventListener('invalid', e => console.log('invalid', e));
        this.disabled = this.disabled;
        this.value = this.value;
        this.type = this.type;
        this.placeholder = this.placeholder;
        this.appearance = this.appearance;
        this.required = this.required;

        setTimeout(() => {
            if (this.childNodes.length === 0) this.container.classList.remove('has-label');
            else this.container.classList.add('has-label');
        });
    }
    getBooleanAttribute(name) {
        return this.hasAttribute(name) && this.getAttribute(name) !== 'false'
    }
    updateAttribute(target, name, value) {
        if (value !== undefined && value !== null && value !== false) target.setAttribute(name, value);
        else target.removeAttribute(name);
    }
    onValueUpdated() {
        if (this.input.value === undefined || this.input.value === null || this.input.value === "")
            this.container.classList.remove('has-value');
        else this.container.classList.add('has-value');
        if (this.input.validity.valid) this.container.classList.remove('has-error');
        else this.container.classList.add('has-error');
    }
}
try {
  customElements.define('kg-input', KgInput);
} catch (e) {
}


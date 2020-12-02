import css from './style.scss';
import html from './index.html';
import {addEventListener, getBooleanAttribute, updateAttribute} from "../../Utilities/dom.utils";

class KgInput extends HTMLElement {
    get disabled() {
        return getBooleanAttribute(this,'disabled');
    }
    set disabled(val) {
        updateAttribute(this, 'disabled', val);
        updateAttribute(this.input, 'disabled', val);
    }
    get value() {
        return this.input.value;
    }
    set value(val) {
        updateAttribute(this, 'value', val);
        updateAttribute(this.input, 'value', val);
        this.onValueUpdated();
    }
    get type() {
        return this.getAttribute('type');
    }
    set type(val) {
        updateAttribute(this, 'type', val);
        updateAttribute(this.input, 'type', val);
    }
    get placeholder() {
        return this.getAttribute('placeholder');
    }
    set placeholder(val) {
        updateAttribute(this, 'placeholder', val);
        updateAttribute(this.input, 'placeholder', val);
    }
    get appearance() {
        return this.getAttribute('appearance');
    }
    set appearance(val) {
        updateAttribute(this, 'appearance', val);
    }
    get required() {
        return this.getAttribute('required');
    }
    set required(val) {
        updateAttribute(this, 'required', val);
        updateAttribute(this.input, 'required', val);
    }
    get color() {
        return this.getAttribute('color');
    }
    set color(val) {
        updateAttribute(this, 'color', val);
        updateAttribute(this.calendar, 'color', val);
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
        this.calendar = this.shadowRoot.querySelector('kg-calendar');
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
        this.shadowRoot.querySelector('.date-icon').addEventListener('click', e => {
           this.container.classList.toggle('show-calendar');
        });
        this.shadowRoot.querySelector('.overlay').addEventListener('click', e => {
            this.container.classList.remove('show-calendar');
        });
        addEventListener(this.calendar, '.day', 'click', e => {
            this.container.classList.remove('show-calendar');
            this.input.valueAsDate = this.calendar.value;
        });

        this.disabled = this.disabled;
        this.value = this.value;
        this.type = this.type;
        this.placeholder = this.placeholder;
        this.appearance = this.appearance;
        this.required = this.required;
        this.color = this.color;

        setTimeout(() => {
            if (this.childNodes.length === 0) this.container.classList.remove('has-label');
            else this.container.classList.add('has-label');
        });
    }

    onValueUpdated() {
        if (this.input.value === undefined || this.input.value === null || this.input.value === "")
            this.container.classList.remove('has-value');
        else this.container.classList.add('has-value');
        if (this.input.validity.valid) this.container.classList.remove('has-error');
        else this.container.classList.add('has-error');
        if (this.calendar && this.input.value) {
            const parts = this.input.value.split("-");
            this.calendar.value = new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);
        }
    }
}
try {
  customElements.define('kg-input', KgInput);
} catch (e) {
}


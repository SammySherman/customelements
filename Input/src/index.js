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
    get label() {
        return this.getAttribute('label');
    }
    set label(val) {
        updateAttribute(this, 'label', val);
        if (this.labelEl) this.labelEl.innerText = val || '';
        if (!val) this.containerEl?.classList.remove('has-label');
        else this.containerEl?.classList.add('has-label');
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
        this.containerEl = this.shadowRoot.querySelector('.container');
        this.error = this.shadowRoot.querySelector('.error');
        this.calendar = this.shadowRoot.querySelector('kg-calendar');
        this.labelEl = this.shadowRoot.querySelector('label');
        this.input.addEventListener('input', e => this.onValueUpdated());
        this.input.addEventListener('focus', e => {
            this.containerEl.classList.add('focused');
            if (!this.touched) {
                this.touched = true;
                this.containerEl.classList.add('touched');
            }
            this.updateValidity();
        });
        this.input.addEventListener('blur', e => this.containerEl.classList.remove('focused'));
        this.shadowRoot.querySelector('.date-icon').addEventListener('click', e => {
            e.stopPropagation();
            this.calendar.reset();
            this.containerEl.classList.toggle('show-calendar');
        });
        document.addEventListener('click', e => {
            this.containerEl.classList.remove('show-calendar');
        });
        addEventListener(this.calendar, '.day', 'click', e => {
            // this.container.classList.remove('show-calendar');
            this.input.valueAsDate = this.calendar.value;
            this.updateValidity();
        });

        this.disabled = this.disabled;
        this.value = this.value;
        this.type = this.type;
        this.placeholder = this.placeholder;
        this.appearance = this.appearance;
        this.required = this.required;
        this.color = this.color;
        this.label = this.label;
    }

    updateValidity() {
        if (this.input.checkValidity()) this.containerEl.classList.remove('has-error');
        else this.containerEl.classList.add('has-error');
    }

    onValueUpdated() {
        if (this.input.value === undefined || this.input.value === null || this.input.value === "")
            this.containerEl.classList.remove('has-value');
        else this.containerEl.classList.add('has-value');
        if (this.input.validity.valid) this.containerEl.classList.remove('has-error');
        else this.containerEl.classList.add('has-error');
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


import css from './style.scss';
import html from './index.html';
import {addEventListener, getBooleanAttribute, updateAttribute} from "../../Utilities/dom.utils";

class KgSelect extends HTMLElement {
    get disabled() {
        return getBooleanAttribute(this,'disabled');
    }
    set disabled(val) {
        updateAttribute(this, 'disabled', val);
        updateAttribute(this.selectEl, 'disabled', val);
    }
    get value() {
        return this.select?.value;
    }
    set value(val) {
        updateAttribute(this, 'value', val);
        this.select(val);
    }
    get placeholder() {
        return this.getAttribute('placeholder');
    }
    set placeholder(val) {
        updateAttribute(this, 'placeholder', val);
        updateAttribute(this.selectedTextEl, 'placeholder', val);
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
        updateAttribute(this.selectEl, 'required', val);
    }
    get color() {
        return this.getAttribute('color');
    }
    set color(val) {
        updateAttribute(this, 'color', val);
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
        requestAnimationFrame(() => {
            const template = document.createElement('template');
            template.innerHTML = `<style>${css}</style>${html}`;
            let content = template.content.cloneNode(true);
            this.attachShadow({mode: 'open'})
                .appendChild(content);
            this.containerEl = this.shadowRoot.querySelector('.container');
            this.optionsContainerEl = this.shadowRoot.querySelector('.options-container');
            this.selectedContainerEl = this.shadowRoot.querySelector('.selected-container');
            this.selectedTextEl = this.selectedContainerEl.querySelector('.selected-text');
            this.labelEl = this.shadowRoot.querySelector('label');
            this.selectEl = document.createElement('select');

            let maxLength = 0;
            this.optionsContainerEl.append(...[...this.children].map(c => {
                const optionEl = document.createElement('span');
                optionEl.setAttribute('value', c.getAttribute('value'));
                optionEl.innerHTML = c.innerHTML;
                maxLength = Math.max(maxLength, c.innerText.length);
                return optionEl;
            }));
            this.style.minWidth = `${maxLength * 10 + 32}px`;
            this.selectEl.append(...this.children);
            this.shadowRoot.append(this.selectEl);

            this.selectedContainerEl.addEventListener('click', e => {
                e.stopPropagation();
                this.containerEl.classList.toggle('is-open');
            });
            document.addEventListener('click', e =>
                this.containerEl.classList.remove('is-open'));

            addEventListener(this.optionsContainerEl, 'span', 'click', e =>
                this.select(e.target.getAttribute('value')));

            ///
            this.containerEl.addEventListener('focus', e => {
                console.log('focused', this.containerEl);
                this.containerEl.classList.add('focused');
                if (!this.touched) {
                    this.touched = true;
                    this.containerEl.classList.add('touched');
                }
                if (this.selectEl.validity.valid) this.containerEl.classList.remove('has-error');
                else this.containerEl.classList.add('has-error');
            });
            this.containerEl.addEventListener('blur', e => {
                console.log('blurred');
                this.containerEl.classList.remove('focused');
            });

            this.value = this.value;
            this.placeholder = this.placeholder;
            this.label = this.label;
        });
    }

    select(value) {
        if (!this.selectEl) return;
        this.selectEl.value = value || 0;
        this.selectedTextEl.innerHTML = this.selectEl.querySelector(':checked')?.innerHTML || '';
        this.optionsContainerEl.querySelector('.selected')?.classList.remove('selected');
        this.optionsContainerEl.querySelector(`[value="${this.selectEl.value}"]`)?.classList.add('selected');

        if (this.selectEl.value === undefined || this.selectEl.value === null || this.selectEl.value === "")
            this.containerEl.classList.remove('has-value');
        else this.containerEl.classList.add('has-value');
        if (this.selectEl.validity.valid) this.containerEl.classList.remove('has-error');
        else this.containerEl.classList.add('has-error');
    }

}
try {
  customElements.define('kg-select', KgSelect);
} catch (e) {
}

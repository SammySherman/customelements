import css from './style.scss';
import html from './index.html';

class Checkbox extends HTMLElement {
    get disabled() {
        return this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false';
    }
    set disabled(val) {
        if(val) this.setAttribute('disabled', val);
        else this.removeAttribute('disabled');
        !!this.checkbox && (this.checkbox.disabled = this.disabled);
    }
    get align() {
        return this.getAttribute('align');
    }
    set align(val) {
        if (val) this.setAttribute('align', val);
        else this.removeAttribute('align')
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
        this.addEventListener('click', e => {
            if (e.composedPath()[0].nodeName === 'DIV' && !this.disabled) {
                this.checkbox.checked = !this.checkbox?.checked;
            }
        });
        this.disabled = this.disabled;
        this.align = this.align;
    }
}
customElements.define('kg-checkbox', Checkbox);


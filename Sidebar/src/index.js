import css from './style.scss';
import html from './index.html';

class KgSidebar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
    }
}
try {
  customElements.define('kg-sidebar', KgSidebar);
} catch (e) {
}


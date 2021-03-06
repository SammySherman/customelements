import css from './style.scss';
import html from './index.html';

export default class KgRipple extends HTMLElement {
    get mode() {
        return this.getAttribute('mode') || 'mouse';
    }
    set mode(val) {
        if (val) this.setAttribute('mode', val);
        else this.removeAttribute('mode')
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
        this.parentNode.addEventListener('mousedown', e => this.trigger(e.target, e.layerX, e.layerY));
        this.mode = this.mode;
    }

    trigger(target, eventX, eventY) {
        const diameter = Math.max(target.clientWidth, target.clientHeight);
        const radius = diameter / 2;
        const ripple = document.createElement("span");
        ripple.style.height = ripple.style.width = `${diameter}px`;
        ripple.style.left = this.mode === 'mouse' ? `${eventX - radius}px` : `calc(50% - ${radius}px)`;
        ripple.style.top = this.mode === 'mouse' ? `${eventY- radius}px` : `calc(50% - ${radius}px)`;
        this.shadowRoot.appendChild(ripple);
        ripple.addEventListener('animationend', e => ripple?.remove());
    }
}
try {
    customElements.define('kg-ripple', KgRipple);
} catch (e) {
}
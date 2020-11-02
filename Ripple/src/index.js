import css from './style.scss';
import html from './index.html';

export default class KgRipple extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
        this.parentNode.addEventListener('click', e => {
            console.log('click', e, this.mode);
            const button = e.target;
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            this.ripple?.remove();
            this.ripple = document.createElement("span");
            this.ripple.style.height = this.ripple.style.width = `${diameter}px`;
            this.ripple.style.left =`${e.layerX - radius}px`;
            this.ripple.style.top = `${e.layerY - radius}px`;
            this.shadowRoot.appendChild(this.ripple);
        });
        this.addEventListener('webkitAnimationEnd', () => this.ripple?.remove());
    }
}
customElements.define('kg-ripple', KgRipple);


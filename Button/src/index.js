import css from './style.css';
import html from './index.html';

class KgButton extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', e => !this.hasAttribute('disabled') && this.createRipple(e));
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
    }

    createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.classList.add('kg-ripple');
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        const ripple = button.getElementsByClassName("kg-ripple")[0];
        if (ripple) ripple.remove();
        button.appendChild(circle);
    }
}
customElements.define('kg-button', KgButton);

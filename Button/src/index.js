import css from './style.scss';
import html from './index.html';

class KgButton extends HTMLElement {
    get disabled() {
        return this.hasAttribute('disabled') && this.getAttribute('disabled') !== 'false';
    }

    set disabled(val) {
        if(val) this.setAttribute('disabled', val);
        else this.removeAttribute('disabled');
    }

    get appearance() {
        return this.getAttribute('appearance');
    }
    set appearance(val) {
        if (!!val) this.setAttribute('appearance', val);
        else this.removeAttribute('appearance');
    }

    get color() {
        return this.getAttribute('color');
    }
    set color(val) {
        if (!!val) this.setAttribute('color', val);
        else this.removeAttribute('color');
    }

    constructor() {
        super();
        this.addEventListener('click', e => !this.disabled && this.createRipple(e));
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        let content = template.content.cloneNode(true);
        this.attachShadow({mode: 'open'})
            .appendChild(content);
        // this.disabled = this.disabled;
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

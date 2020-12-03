import css from './style.scss';
import html from './index.html';
import {addEventListener, getBooleanAttribute, updateAttribute} from "../../Utilities/dom.utils";

class KgCalendar extends HTMLElement {
    get disabled() {
        return getBooleanAttribute(this,'disabled');
    }
    set disabled(val) {
        updateAttribute(this, 'disabled', val);
    }
    get mini() {
        return getBooleanAttribute(this,'mini');
    }
    set mini(val) {
        updateAttribute(this, 'mini', val);
    }
    get color() {
        return this.getAttribute('color');
    }
    set color(val) {
        if (!!val) this.setAttribute('color', val);
        else this.removeAttribute('color');
    }
    get value() {
        return this._value ? new Date(this._value.getTime()) : undefined;
    }
    set value(val) {
        this._value = val;
        updateAttribute(this, 'value', val);
        this.renderCalendar(val);
    }

    select() {

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

        this.header = this.shadowRoot.querySelector('.header');
        this.subHeader = this.shadowRoot.querySelector('.sub-header');
        this._target = this.value || new Date();
        this.renderCalendar(this._target);

        this.shadowRoot.querySelector('.pagination').addEventListener('click', e => {
            e.stopPropagation();
            this._target.setMonth(this._target.getMonth() + Number(e.target.dataset.step));
            this.renderCalendar(this._target);
        });

        addEventListener(this, '.day', 'click', e => {
            this.selected?.classList?.remove('selected');
            e.target.classList.add('selected');
            this.selected = e.target;
            this._value = new Date(Number(this.selected.dataset.time));
            this._target = this.value;
        });
    }

    getCalendarDays(target) {
        const days = []; // Date[][]
        if (!target) return days;
        target.setHours(0, 0, 0);
        // SetDate(0) sets to last day of previous month
        const endOfCalendar = new Date(target.getTime());
        endOfCalendar.setMonth(endOfCalendar.getMonth() + 1);
        endOfCalendar.setDate(0);
        endOfCalendar.setDate(endOfCalendar.getDate() + (6 - endOfCalendar.getDay()));

        const dayCursor = new Date(target.getTime());
        dayCursor.setDate(1);
        dayCursor.setDate(dayCursor.getDate() - dayCursor.getDay());
        let weekCursor = [];
        while (dayCursor.getTime() <= endOfCalendar.getTime()) {
            weekCursor.push(new Date(dayCursor.getTime()));
            dayCursor.setDate(dayCursor.getDate() + 1);
            if (dayCursor.getDay() === 0) {
                days.push(weekCursor);
                weekCursor = [];
            }
        }
        return days;
    }

    renderCalendar(target) {
        if (!target) return;
        this.selected?.classList?.remove('selected');
        const calendarDays = this.getCalendarDays(target);
        this.shadowRoot.querySelectorAll('.week').forEach(x => x.remove());
        this.shadowRoot.append(...calendarDays.map(week => this.makeWeekEl(week, target)));

        const el = document.createElement('kg-button');
        el.innerText = target.toLocaleString("default", {month: "short", year: "numeric"}).toUpperCase();
        this.header.innerHTML = el.outerHTML;
        this.subHeader.innerText = target.toLocaleString("default", {month: "short"}).toUpperCase();
        this.days = [...this.shadowRoot.querySelectorAll('.day')];
    }

    reset() {
        this._target = this.value || new Date();
        this.renderCalendar(this._target);
    }

    makeWeekEl(week, target) {
        const weekEl = document.createElement('div');
        weekEl.classList.add('week');
        weekEl.append(...week.map(day => this.makeDayEl(day, target)));
        return weekEl;
    }

    makeDayEl(day, target) {
        const dayEl = document.createElement('div');
        const today = new Date();
        dayEl.classList.add('day');
        if (day.getMonth() !== target.getMonth() || day.getFullYear() !== target.getFullYear())
            dayEl.classList.add('blur');
        if (day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear())
            dayEl.classList.add('today');
        if (day.getTime() === this._value?.getTime()){
            dayEl.classList.add('selected');
            this.selected = dayEl;
        }
        dayEl.dataset.time = day.getTime();
        const dateNumberEl = document.createElement('span');
        dateNumberEl.classList.add('number');
        dateNumberEl.append(`${day.getDate()}`);
        const numberBackgroundEl = document.createElement('span');
        numberBackgroundEl.classList.add('background');
        dateNumberEl.append(numberBackgroundEl);
        dayEl.append(dateNumberEl);
        return dayEl;
    }
}
try {
  customElements.define('kg-calendar', KgCalendar);
} catch (e) {
}
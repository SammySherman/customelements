export function addEventListener(target, selector, type, listener) {
    target.addEventListener(type, e => {
        const matchedPath = e.composedPath().find(x => !!x?.matches && x.matches(selector));
        if (matchedPath)  listener({ ...e, target: matchedPath });
    });
}

export function getBooleanAttribute(target, name) {
    return target.hasAttribute(name) && target.getAttribute(name) !== 'false'
}

export function updateAttribute(target, name, value) {
    if (value !== undefined && value !== null && value !== false) target.setAttribute(name, value);
    else target.removeAttribute(name);
}
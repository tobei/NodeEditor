export function createElement(parentElement, classes) {
    const element = document.createElement('div');
    classes.forEach(aClass => element.classList.add(aClass));
    parentElement.appendChild(element);
    return element;
}
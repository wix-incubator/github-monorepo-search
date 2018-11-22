import {doSearch} from './common';

export function setup() {
  const formEl: HTMLFormElement = document.querySelector('.main-form');
  const inputEl: HTMLInputElement = formEl.elements.namedItem('searchString') as HTMLInputElement;
  
  formEl.onsubmit = (ev) => {
    ev.preventDefault();
    doSearch(inputEl.value);
  };
}
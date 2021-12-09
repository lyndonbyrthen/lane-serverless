import { MDCList } from "@material/list";
import { MDCDrawer } from "@material/drawer";
import { MDCRipple } from '@material/ripple';
import {MDCTopAppBar} from '@material/top-app-bar';
import $ from "jquery";

const list = new MDCList(document.querySelector('.mdc-list'));
const listItemRipples = list.listElements.map((listItemEl) => new MDCRipple(listItemEl));

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const $scrim = $(document.querySelector('.mdc-drawer-scrim'));
const menuButton = document.querySelector('.menu-button');

const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});

const openDraw = (bool = true) => {
    drawer.open = bool;
    $scrim.toggleClass('hidden', !bool);
}

menuButton.addEventListener('click', () => {
    openDraw();
});

$scrim.on('click', () => {
    openDraw(false);
});

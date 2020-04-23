import document from '../document.js';

import toolsService from './tools.js';

const menuContainer = document.getElementById('menu');
let activeAction;
let menuItems;

function createMenuElement(menuItem) {
  const menuItemEl = document.createElement('a');
  menuItem.element = menuItemEl;
  menuItemEl.className = 'item';
  menuItemEl.innerHTML = `<img class="icon" src="${menuItem.icon}" />`;
  menuItemEl.setAttribute('title', menuItem.label);
  menuItemEl.addEventListener('click', () => setActiveMenu(menuItem));

  menuContainer.appendChild(menuItemEl);
}

function setActiveMenu(menuItem) {
  toolsService.activate(menuItem.action);
}

function toolUpdated(newToolName) {
  updateMenu(menuItems.find((m) => m.action == newToolName));
}

function updateMenu(menuItem) {
  if (activeAction && activeAction.element) {
    activeAction.element.classList.remove('active');
  }

  activeAction = menuItem;
  menuItem.element.classList.add('active');
}

toolsService.registerListener(toolUpdated);

export default {
  initialize: function(items) {
    menuItems = items;
    items.forEach(createMenuElement);
    setActiveMenu(items[0]);
  },
};

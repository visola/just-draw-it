(function(actions) {
  const menuContainer = document.getElementById('menu');

  const menuItems = [
    {
      action: 'rectangle',
      icon: 'icons/menu/rectangle.svg',
      label: 'Rectangle',
    },
    {
      action: 'ellipse',
      icon: 'icons/menu/ellipse.svg',
      label: 'Ellipse',
    },
  ];

  let activeAction;

  function createMenuElement(menuItem) {
    const menuItemEl = document.createElement('a');
    menuItem.element = menuItemEl;
    menuItemEl.className = 'item';
    menuItemEl.innerHTML = `<img class="icon" src="${menuItem.icon}" />${menuItem.label}`;
    menuItemEl.addEventListener('click', () => setActiveMenu(menuItem));

    menuContainer.appendChild(menuItemEl);
  }

  function setActiveMenu(menuItem) {
    if (activeAction && menuItem.action == activeAction.action) {
      return;
    }

    if (activeAction && activeAction.element) {
      activeAction.element.classList.remove('active');
    }

    activeAction = menuItem;
    menuItem.element.classList.add('active');
    actions.activate(menuItem.action);
  }

  menuItems.forEach(createMenuElement);
  setActiveMenu(menuItems[0]);
})(actions);

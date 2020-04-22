(function(tools) {
  const menuContainer = document.getElementById('menu');

  const menuItems = [
    {
      action: 'selectTransform',
      icon: 'icons/menu/select.svg',
      label: 'Selection',
    },
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
    menuItemEl.innerHTML = `<img class="icon" src="${menuItem.icon}" />`;
    menuItemEl.setAttribute('title', menuItem.label);
    menuItemEl.addEventListener('click', () => setActiveMenu(menuItem));

    menuContainer.appendChild(menuItemEl);
  }

  function setActiveMenu(menuItem) {
    tools.activate(menuItem.action);
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

  menuItems.forEach(createMenuElement);
  setActiveMenu(menuItems[0]);
  tools.registerListener(toolUpdated);
})(tools);

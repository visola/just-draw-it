define(['document', 'services/tools'], function(document, toolsService) {
  const menuContainer = document.getElementById('menu');
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

  return {
    initialize: function(items) {
      menuItems = items;
      menuItems.forEach(createMenuElement);
      setActiveMenu(menuItems[0]);
    },
  };
});

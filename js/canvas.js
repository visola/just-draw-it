/* exported canvas */
const canvas = (function() {
  const element = document.getElementById('canvas');

  function addElement(toAdd) {
    element.appendChild(toAdd);
  }

  return {
    addElement,
    element,
  };
})();

/* exported canvas */
const canvas = (function() {
  const element = document.getElementById('canvas');

  function addElement(toAdd) {
    element.appendChild(toAdd);
  }

  function getClickable(x, y) {
    const elements = document.elementsFromPoint(x, y);
    const result = [];

    for (let i = 0; i < elements.length; i++) {
      const currentEl = elements[i];
      if (element == currentEl) {
        break; // Stop when SVG element is found
      }
      result.push(currentEl);
    }
    return result;
  }

  return {
    addElement,
    element,
    getClickable,
  };
})();

/* exported drawingProperties */
const drawingProperties = (function () {
  let _fillColor = 'rgb(150,150,150,0.25)';
  let _strokeColor = 'rgb(0,0,0,0.8)';

  return {
    get fillColor() {
      return _fillColor;
    },
    get strokeColor() {
      return _strokeColor;
    },
  }
})();

import './tools/index.js';

const resizeCanvas = () => {
    const svgEl = document.getElementById('canvas');
    const parent = svgEl.parentElement;
    svgEl.setAttribute('height', parent.clientHeight);
    svgEl.setAttribute('width', parent.clientWidth - 56);
};

window.addEventListener('resize', resizeCanvas);
resizeCanvas()
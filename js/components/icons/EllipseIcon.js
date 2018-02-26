import React from 'react';

export default class EllipseIcon extends React.Component {
  render() {
    return <svg className="icon">
      <ellipse
        cx="50%"
        cy="50%"
        rx="45%"
        ry="30%"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
    </svg>;
  }
}

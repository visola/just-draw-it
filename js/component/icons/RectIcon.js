import React from 'react';

export default class RectIcon extends React.Component {
  render() {
    return <svg className="icon">
      <rect
        x="2%"
        y="2%"
        width="96%"
        height="96%"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
    </svg>;
  }
}

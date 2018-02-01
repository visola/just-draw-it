import React from 'react';

export default class StrokeWidthIcon extends React.Component {
  render() {
    return <svg className="icon">
      <rect x="2%" y="2%" width="96%" height="6%" stroke="none" fill="#000" />
      <rect x="2%" y="14%" width="96%" height="12%" stroke="none" fill="#000" />
      <rect x="2%" y="32%" width="96%" height="24%" stroke="none" fill="#000" />
      <rect x="2%" y="62%" width="96%" height="48%" stroke="none" fill="#000" />
    </svg>
  }
}

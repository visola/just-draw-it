import React from 'react';

import BaseIcon from './BaseIcon';

export default class PointerIcon extends BaseIcon {
  render() {
    const points = [
      [20,0],
      [80,55],
      [55,50],
      [70,90],
      [50,100],
      [35,55],
      [15,75],
    ];

    const convertedPoints = [];
    points.forEach((p) => {
      convertedPoints.push([
        p[0] * this.width / 100,
        p[1] * this.height / 100,
      ]);
    });

    let path = "M"+convertedPoints[0][0]+" "+convertedPoints[0][1];
    for (let i = 1; i < convertedPoints.length; i += 1) {
      path += " L"+convertedPoints[i][0]+" "+convertedPoints[i][1];
    }
    path += " Z";

    return <svg className="icon">
      <path d={path} />
    </svg>;
  }
}

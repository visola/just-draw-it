import { action, autorun, computed, observable } from 'mobx';

import Collection from './Collection';
import ControlPoint from '../models/ControlPoint';

export default class Selection extends Collection {
  @observable controlPoints = [];

  constructor(drawables) {
    super();
    this.drawables = drawables;
    autorun(() => this.updateControlPoints())
  }

  addControlPoints(boundingRect) {
    const { x, y, height, width } = boundingRect;
    this.controlPoints = [
      new ControlPoint(x, y),
      new ControlPoint(x, y + height),
      new ControlPoint(x + width, y),
      new ControlPoint(x + width, y + height),
    ];
    this.drawables.pushAll(this.controlPoints);
  }

  clearControlPoints() {
    if (this.controlPoints.length === 0) {
      return;
    }

    this.drawables.removeByIds(this.controlPoints.map((c) => c.id));
    this.controlPoints = [];
  }

  @computed
  get boundingRect() {
    if (this.collection.length === 0) {
      return null;
    }

    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = 0;
    let maxY = 0;

    this.collection.forEach((d) => {
      const halfStrokeWidth = d.strokeWidth / 2;
      if (minX > d.x) {
        minX = d.x - halfStrokeWidth;
      }
      if (minY > d.y) {
        minY = d.y - halfStrokeWidth;
      }
      if (maxX < d.x + d.width) {
        maxX = d.x + d.width + halfStrokeWidth;
      }
      if (maxY < d.y + d.height) {
        maxY = d.y + d.height + halfStrokeWidth;
      }
    });

    return {
      x: minX,
      y: minY,
      height: maxY - minY,
      width: maxX - minX,
    };
  }

  @action
  push(drawable) {
    if (!this.contains(drawable)) {
      this.collection.push(drawable);
    }
  }

  updateControlPoints() {
    const boundingRect = this.boundingRect;
    if (boundingRect) {
      if (this.controlPoints.length === 0) {
        this.addControlPoints(boundingRect);
      } else {
        this.updateControlPointsPositions(boundingRect);
      }
    } else {
      this.clearControlPoints();
    }
  }

  updateControlPointsPositions(boundingRect) {
    const { x, y, height, width } = boundingRect;
    this.controlPoints[0].x = x;
    this.controlPoints[0].y = y;

    this.controlPoints[1].x = x;
    this.controlPoints[1].y = y + height;

    this.controlPoints[2].x = x + width;
    this.controlPoints[2].y = y;

    this.controlPoints[3].x = x + width;
    this.controlPoints[3].y = y + height;
  }

  @action
  select(drawable) {
    this.clear();
    this.push(drawable);
  }
}

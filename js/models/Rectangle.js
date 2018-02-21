import Drawable from './Drawable';
import Rect from '../components/drawables/Rect';

export default class Rectangle extends Drawable {
  get component() {
    return Rect;
  }
}

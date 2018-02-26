import Drawable from './Drawable';
import EllipseComponent from '../components/drawables/Ellipse';

export default class Ellipse extends Drawable {
  get component() {
    return EllipseComponent;
  }
}

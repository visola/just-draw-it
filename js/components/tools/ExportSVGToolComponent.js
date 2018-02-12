import classnames from 'classnames';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

@observer
export default class ExportSVGToolComponent extends React.Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tool: PropTypes.object.isRequired,
  }

  handleClick(e) {
    const { tool } = this.props;
    if (!tool.isActive()) {
      e.preventDefault();
    }
    tool.onDownload();
  }

  render() {
    const { tool } = this.props;
    return <a
      className={classnames({ btn: true, 'btn-default': true, active: this.props.selected })}
      disabled={!tool.isActive()}
      download="drawing.svg"
      onClick={this.handleClick.bind(this)}
      href={tool.url}
    >
      <span className="icon glyphicon glyphicon-save"></span>
    </a>;
  }
}

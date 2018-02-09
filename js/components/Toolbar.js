import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import toolsComponents from './tools/toolsComponents';
import AbstractSelectionTool from '../tools/AbstractSelectionTool';

@inject('drawables', 'selection', 'tools')
@observer
export default class Toolbar extends React.Component {
  static propTypes = {
    drawables: PropTypes.object.isRequired,
    selection: PropTypes.object.isRequired,
    tools: PropTypes.object.isRequired,
  }

  handleClick(tool) {
    this.props.tools.select(tool);
  }

  render() {
    const { selectedTool } = this.props.tools;
    return (
      <div className="toolbar">
        {this.props.tools.all.map((t, i) => this.renderTool(t, i, t === selectedTool))}
      </div>
    );
  }

  renderTool(tool, index, selected) {
    if (tool instanceof AbstractSelectionTool) {
      return null;
    }

    const ToolComponent = toolsComponents.getComponentForTool(tool);
    return <ToolComponent
      key={index}
      onClick={this.handleClick.bind(this, tool)}
      selected={selected}
      tool={tool}
    />;
  }
}

/*******************************************************************************
 * Copyright (c) 2023 Obeo and others.
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 *******************************************************************************/

import { memo } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { ListNodeData } from './ListNode.types';

const listNodeStyle = (style: React.CSSProperties): React.CSSProperties => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    ...style,
  };
};

const listNodeHeaderStyle = (style: React.CSSProperties): React.CSSProperties => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '8px 16px',
    ...style,
  };
};

const listItemStyle = (style: React.CSSProperties): React.CSSProperties => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    padding: '4px 8px',
    ...style,
  };
};

export const ListNode = memo(({ data, isConnectable }: NodeProps<ListNodeData>) => {
  return (
    <div style={listNodeStyle(data.style)}>
      <div style={listNodeHeaderStyle(data.label.style)}>{data.label.text}</div>
      <div>
        {data.listItems.map((listItem) => {
          return (
            <div key={listItem.id} style={listItemStyle(listItem.style)}>
              {listItem.label.text}
            </div>
          );
        })}
      </div>
      <Handle type="source" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="target" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
});

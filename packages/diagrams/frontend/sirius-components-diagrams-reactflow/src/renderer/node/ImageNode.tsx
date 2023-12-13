/*******************************************************************************
 * Copyright (c) 2023 Obeo.
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

import { ServerContext, ServerContextValue } from '@eclipse-sirius/sirius-components-core';
import { Theme, useTheme } from '@material-ui/core/styles';
import { memo, useContext } from 'react';
import { NodeProps, NodeResizer } from 'reactflow';
import { BorderNodePosition } from '../DiagramRenderer.types';
import { Label } from '../Label';
import { useConnector } from '../connector/useConnector';
import { useDropNodeStyle } from '../dropNode/useDropNodeStyle';
import { ConnectionCreationHandles } from '../handles/ConnectionCreationHandles';
import { ConnectionHandles } from '../handles/ConnectionHandles';
import { ConnectionTargetHandle } from '../handles/ConnectionTargetHandle';
import { useRefreshConnectionHandles } from '../handles/useRefreshConnectionHandles';
import { DiagramElementPalette } from '../palette/DiagramElementPalette';
import { ImageNodeData } from './ImageNode.types';
import { NodeContext } from './NodeContext';
import { NodeContextValue } from './NodeContext.types';

const imageNodeStyle = (
  theme: Theme,
  style: React.CSSProperties,
  selected: boolean,
  hovered: boolean,
  faded: boolean,
  rotation: string | undefined
): React.CSSProperties => {
  const imageNodeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    opacity: faded ? '0.4' : '',
    transform: rotation,
    ...style,
  };
  if (selected || hovered) {
    imageNodeStyle.outline = `${theme.palette.selected} solid 1px`;
  }

  return imageNodeStyle;
};

const computeBorderRotation = (data: ImageNodeData): string | undefined => {
  if (data?.isBorderNode && data.positionDependentRotation) {
    switch (data.borderNodePosition) {
      case BorderNodePosition.NORTH:
        return 'rotate(90deg)';
      case BorderNodePosition.EAST:
        return 'rotate(180deg)';
      case BorderNodePosition.SOUTH:
        return 'rotate(270deg)';
      default:
        return undefined;
    }
  }
  return undefined;
};

const outsideBottomLabelAreaStyle = (): React.CSSProperties => {
  return {
    display: 'grid',
    gridTemplateColumns: `1fr 1fr 1fr`,
    gridTemplateRows: `min-content`,
    gridTemplateAreas: `
    'BOTTOM_BEGIN   BOTTOM_MIDDLE   BOTTOM_END'
    `,
  };
};

export const ImageNode = memo(({ data, id, selected }: NodeProps<ImageNodeData>) => {
  const { httpOrigin } = useContext<ServerContextValue>(ServerContext);
  const theme = useTheme();
  const { style: dropFeedbackStyle } = useDropNodeStyle(id);
  const { hoveredNode } = useContext<NodeContextValue>(NodeContext);
  const { newConnectionStyleProvider } = useConnector();
  const rotation = computeBorderRotation(data);

  useRefreshConnectionHandles(id, data.connectionHandles);

  const outsideBottomlabels: JSX.Element[] = [];
  if (data.outsideLabels.BOTTOM_MIDDLE) {
    const outsideLabel = data.outsideLabels.BOTTOM_MIDDLE;
    outsideBottomlabels.push(
      <div style={{ gridArea: 'BOTTOM_MIDDLE' }} key={outsideLabel.id}>
        <Label diagramElementId={id} label={outsideLabel} faded={data.faded} transform="" />
      </div>
    );
  }
  return (
    <>
      <NodeResizer
        color={theme.palette.selected}
        isVisible={selected && !data.isBorderNode}
        shouldResize={() => !data.isBorderNode}
        keepAspectRatio={data.nodeDescription?.keepAspectRatio}
      />
      <div
        style={{
          ...imageNodeStyle(theme, data.style, selected, hoveredNode?.id === id, data.faded, rotation),
          ...newConnectionStyleProvider.getNodeStyle(id, data.descriptionId),
          ...dropFeedbackStyle,
          backgroundImage: `url(${httpOrigin + data.imageURL})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
        data-testid={`Image - ${data?.targetObjectLabel}`}>
        {data.insideLabel ? (
          <Label diagramElementId={id} label={data.insideLabel} faded={data.faded} transform="" />
        ) : null}
        {selected ? (
          <DiagramElementPalette diagramElementId={id} labelId={data.insideLabel ? data.insideLabel.id : null} />
        ) : null}
        {selected ? <ConnectionCreationHandles nodeId={id} /> : null}
        <ConnectionTargetHandle nodeId={id} />
        <ConnectionHandles connectionHandles={data.connectionHandles} />
      </div>
      <div style={{ ...outsideBottomLabelAreaStyle() }}>{outsideBottomlabels}</div>
    </>
  );
});

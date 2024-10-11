/*******************************************************************************
 * Copyright (c) 2024 Obeo.
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
import { Edge, EdgeProps, Node, Position, getSmoothStepPath, useInternalNode, XYPosition } from '@xyflow/react';
import { memo, useContext } from 'react';
import parse from 'svg-path-parser';
import { NodeTypeContext } from '../../contexts/NodeContext';
import { NodeTypeContextValue } from '../../contexts/NodeContext.types';
import { NodeData } from '../DiagramRenderer.types';
import { DiagramNodeType } from '../node/NodeTypes.types';
import { getHandleCoordinatesByPosition } from './EdgeLayout';
import { MultiLabelEdge } from './MultiLabelEdge';
import { MultiLabelEdgeData } from './MultiLabelEdge.types';

export const SmoothStepEdgeWrapper = memo((props: EdgeProps<Edge<MultiLabelEdgeData>>) => {
  const {
    source,
    target,
    markerEnd,
    markerStart,
    sourcePosition,
    targetPosition,
    sourceHandleId,
    targetHandleId,
    data,
  } = props;
  const { nodeLayoutHandlers } = useContext<NodeTypeContextValue>(NodeTypeContext);

  const sourceNode = useInternalNode<Node<NodeData>>(source);
  const targetNode = useInternalNode<Node<NodeData>>(target);

  if (!sourceNode || !targetNode) {
    return null;
  }

  const sourceLayoutHandler = nodeLayoutHandlers.find((nodeLayoutHandler) =>
    nodeLayoutHandler.canHandle(sourceNode as Node<NodeData, DiagramNodeType>)
  );
  const targetLayoutHandler = nodeLayoutHandlers.find((nodeLayoutHandler) =>
    nodeLayoutHandler.canHandle(targetNode as Node<NodeData, DiagramNodeType>)
  );

  let { x: sourceX, y: sourceY } = getHandleCoordinatesByPosition(
    sourceNode,
    sourcePosition,
    sourceHandleId ?? '',
    sourceLayoutHandler?.calculateCustomNodeEdgeHandlePosition
  );
  let { x: targetX, y: targetY } = getHandleCoordinatesByPosition(
    targetNode,
    targetPosition,
    targetHandleId ?? '',
    targetLayoutHandler?.calculateCustomNodeEdgeHandlePosition
  );

  // trick to have the source of the edge positioned at the very border of a node
  // if the edge has a marker, then only the marker need to touch the node
  const handleSourceRadius = markerStart == undefined || markerStart.includes('None') ? 2 : 3;
  switch (sourcePosition) {
    case Position.Right:
      sourceX = sourceX + handleSourceRadius;
      break;
    case Position.Left:
      sourceX = sourceX - handleSourceRadius;
      break;
    case Position.Top:
      sourceY = sourceY - handleSourceRadius;
      break;
    case Position.Bottom:
      sourceY = sourceY + handleSourceRadius;
      break;
  }
  // trick to have the target of the edge positioned at the very border of a node
  // if the edge has a marker, then only the marker need to touch the node
  const handleTargetRadius = markerEnd == undefined || markerEnd.includes('None') ? 2 : 3;
  switch (targetPosition) {
    case Position.Right:
      targetX = targetX + handleTargetRadius;
      break;
    case Position.Left:
      targetX = targetX - handleTargetRadius;
      break;
    case Position.Top:
      targetY = targetY - handleTargetRadius;
      break;
    case Position.Bottom:
      targetY = targetY + handleTargetRadius;
      break;
  }

  let bendingPoints: XYPosition[];
  if (data?.bendingPoints) {
    bendingPoints = data.bendingPoints;
  } else {
    const [smoothEdgePath] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    bendingPoints = parse(smoothEdgePath)
      .filter((segment) => segment.code === 'Q')
      .map((segment) => {
        return { x: (segment.x + segment.x1) / 2, y: (segment.y + segment.y1) / 2 };
      });
  }
  let smoothEdgePath = `M ${sourceX} ${sourceY}`;
  for (let i = 0; i < bendingPoints.length; i++) {
    smoothEdgePath += ` L ${bendingPoints[i]?.x} ${bendingPoints[i]?.y}`;
  }
  smoothEdgePath += ` L ${targetX} ${targetY}`;

  return (
    <MultiLabelEdge
      {...props}
      sourceX={sourceX}
      sourceY={sourceY}
      targetX={targetX}
      targetY={targetY}
      svgPathString={smoothEdgePath}
      bendingPoints={bendingPoints}
    />
  );
});

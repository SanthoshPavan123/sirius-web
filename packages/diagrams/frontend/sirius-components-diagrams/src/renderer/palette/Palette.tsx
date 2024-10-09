/*******************************************************************************
 * Copyright (c) 2023, 2024 Obeo.
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

import { DataExtension, useData } from '@eclipse-sirius/sirius-components-core';
import React from 'react';
import { useReactFlow, useViewport } from 'reactflow';
import { EdgeData, NodeData } from '../DiagramRenderer.types';
import {
  DiagramPaletteToolContributionComponentProps,
  DiagramPaletteToolContributionProps,
} from './DiagramPaletteToolContribution.types';
import { DraggablePalette } from './draggable-palette/DraggablePalette';
import { PaletteEntry, ToolSection } from './draggable-palette/DraggablePalette.types';
import {
  GQLPaletteDivider,
  GQLPaletteEntry,
  GQLSingleClickOnDiagramElementTool,
  GQLToolSection,
  PaletteProps,
} from './Palette.types';
import { usePaletteQuickAccessToolBar } from './tool-list/usePaletteQuickAccessToolBar';
import { diagramPaletteToolExtensionPoint } from './tool/DiagramPaletteToolExtensionPoints';
import { useDiagramPalette } from './useDiagramPalette';
import { usePalette } from './usePalette';

export const isSingleClickOnDiagramElementTool = (tool: GQLPaletteEntry): tool is GQLSingleClickOnDiagramElementTool =>
  tool.__typename === 'SingleClickOnDiagramElementTool';

export const isToolSection = (entry: GQLPaletteEntry): entry is GQLToolSection => entry.__typename === 'ToolSection';

export const isPaletteDivider = (entry: GQLPaletteEntry): entry is GQLPaletteDivider =>
  entry.__typename === 'PaletteDivider';

export const Palette = ({
  x: paletteX,
  y: paletteY,
  diagramElementId,
  targetObjectId,
  onDirectEditClick,
  hideableDiagramElement,
  onEscape,
}: PaletteProps) => {
  const { getNodes } = useReactFlow<NodeData, EdgeData>();

  let x: number = 0;
  let y: number = 0;
  const { x: viewportX, y: viewportY, zoom: viewportZoom } = useViewport();
  if (viewportZoom !== 0 && paletteX && paletteY) {
    x = (paletteX - viewportX) / viewportZoom;
    y = (paletteY - viewportY) / viewportZoom;
  }
  const { handleToolClick, palette } = usePalette({ x, y, diagramElementId, onDirectEditClick, targetObjectId });

  const paletteToolData: DataExtension<DiagramPaletteToolContributionProps[]> = useData(
    diagramPaletteToolExtensionPoint
  );

  const node = getNodes().find((node) => node.id === diagramElementId);

  const paletteToolComponents: React.ComponentType<DiagramPaletteToolContributionComponentProps>[] = node
    ? paletteToolData.data.filter((data) => data.canHandle(node)).map((data) => data.component)
    : [];
  const paletteEntries: PaletteEntry[] = palette ? filterSingleClickOnDiagramElementTool(palette?.paletteEntries) : [];

  const { quickAccessToolComponents } = usePaletteQuickAccessToolBar({
    diagramElementId: diagramElementId,
    onToolClick: handleToolClick,
    node,
    palette,
    paletteToolComponents,
    x,
    y,
    hideableDiagramElement,
  });

  const toolCount = paletteEntries.length + quickAccessToolComponents.length;

  const { getLastToolInvoked } = useDiagramPalette();
  const lastToolInvoked = palette ? getLastToolInvoked(palette.id) : null;
  const shouldRender = palette && (node || (!node && toolCount > 0));
  if (!shouldRender) {
    return null;
  }
  return (
    <DraggablePalette
      x={paletteX}
      y={paletteY}
      onToolClick={handleToolClick}
      paletteEntries={paletteEntries}
      quickAccessToolComponents={quickAccessToolComponents}
      lastToolInvoked={lastToolInvoked}
      onEscape={onEscape}
    />
  );
};
const filterSingleClickOnDiagramElementTool = (paletteEntries: GQLPaletteEntry[]): PaletteEntry[] => {
  const filteredPaletteEntries: PaletteEntry[] = [];
  paletteEntries.forEach((paletteEntry) => {
    if (isSingleClickOnDiagramElementTool(paletteEntry) || isPaletteDivider(paletteEntry)) {
      filteredPaletteEntries.push(paletteEntry);
    } else if (isToolSection(paletteEntry)) {
      const currentToolSection = paletteEntry as GQLToolSection;
      const filteredTools = currentToolSection.tools.filter(isSingleClickOnDiagramElementTool);
      if (filteredTools.length > 0) {
        const filteredToolSection: ToolSection = {
          ...currentToolSection,
          tools: filteredTools,
          __typename: 'ToolSection',
        };
        filteredPaletteEntries.push(filteredToolSection);
      }
    }
  });
  return filteredPaletteEntries;
};

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
import { Node, NodeChange } from 'reactflow';

export interface UseOverlapValue {
  nodeOverlapEnabled: boolean;
  setNodeOverlapEnabled: (enable: boolean) => void;
  resolveNodeOverlap: (nodes: Node[], direction: 'horizontal' | 'vertical') => Node[];
  resolveNodeOverlapV2: (nodes: Node[]) => boolean;
  handleNodeOverlapForChanges: (changes: NodeChange[], nodes: Node[]) => Node[];
  handleNodeOverlapWithPriority: (priorityNodeId: string | undefined, nodes: Node[]) => Node[];
}

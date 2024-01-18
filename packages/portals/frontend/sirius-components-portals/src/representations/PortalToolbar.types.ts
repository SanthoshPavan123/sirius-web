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

import { PortalRepresentationMode } from './PortalRepresentation.types';

export interface PortalToolbarProps {
  editingContextId: string;
  representationId: string;
  fullscreenNode: React.RefObject<HTMLDivElement>;
  portalMode: PortalRepresentationMode;
  setPortalMode: (portalMode: PortalRepresentationMode) => void;
}

export interface PortalToolbarState {
  modal: 'share' | null;
}

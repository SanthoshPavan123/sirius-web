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

import React, { useEffect, useState } from 'react';
import { useStoreApi } from 'reactflow';
import {
  DiagramLifecycleContextValue,
  DiagramLifecycleProviderProps,
  DiagramLifecycleProviderState,
} from './DiagramLifecycleProvider.types';

export const DiagramLifecycleContext = React.createContext<DiagramLifecycleContextValue>({
  step: 'diagram loading',
  diagramRefreshed: () => {},
  diagramLaidOut: () => {},
  diagramFitView: () => {},
});

export const DiagramLifecycleProvider = ({ children }: DiagramLifecycleProviderProps) => {
  const [state, setState] = useState<DiagramLifecycleProviderState>({
    step: 'diagram loading',
  });

  const diagramRefreshed = () => setState((prevState) => ({ ...prevState, step: 'diagram refreshed' }));
  const diagramLaidOut = () => setState((prevState) => ({ ...prevState, step: 'diagram laid out' }));
  const diagramFitView = () => setState((prevState) => ({ ...prevState, step: 'diagram fit view' }));

  const value: DiagramLifecycleContextValue = {
    step: state.step,
    diagramRefreshed,
    diagramLaidOut,
    diagramFitView,
  };

  const { domNode } = useStoreApi().getState();
  useEffect(() => {
    if (domNode) {
      domNode.dataset.diagramLifecycle = state.step;
    }
  }, [state.step]);

  return <DiagramLifecycleContext.Provider value={value}>{children}</DiagramLifecycleContext.Provider>;
};

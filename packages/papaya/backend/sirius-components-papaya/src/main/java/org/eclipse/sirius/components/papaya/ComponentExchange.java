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
package org.eclipse.sirius.components.papaya;

import org.eclipse.emf.common.util.EList;

/**
 * <!-- begin-user-doc --> A representation of the model object '<em><b>Component Exchange</b></em>'. <!-- end-user-doc
 * -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 * <li>{@link org.eclipse.sirius.components.papaya.ComponentExchange#getPorts <em>Ports</em>}</li>
 * </ul>
 *
 * @see org.eclipse.sirius.components.papaya.PapayaPackage#getComponentExchange()
 * @model
 * @generated
 */
public interface ComponentExchange extends NamedElement {
    /**
     * Returns the value of the '<em><b>Ports</b></em>' reference list. The list contents are of type
     * {@link org.eclipse.sirius.components.papaya.ComponentPort}. <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @return the value of the '<em>Ports</em>' reference list.
     * @see org.eclipse.sirius.components.papaya.PapayaPackage#getComponentExchange_Ports()
     * @model required="true"
     * @generated
     */
    EList<ComponentPort> getPorts();

} // ComponentExchange
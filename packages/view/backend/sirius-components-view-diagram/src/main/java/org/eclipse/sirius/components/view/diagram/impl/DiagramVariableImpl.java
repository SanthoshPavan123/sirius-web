/**
 * Copyright (c) 2021, 2024 Obeo.
 * This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *     Obeo - initial API and implementation
 */
package org.eclipse.sirius.components.view.diagram.impl;

import org.eclipse.emf.common.notify.Notification;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.impl.ENotificationImpl;
import org.eclipse.emf.ecore.impl.MinimalEObjectImpl;
import org.eclipse.sirius.components.view.diagram.DiagramPackage;
import org.eclipse.sirius.components.view.diagram.DiagramVariable;

/**
 * <!-- begin-user-doc --> An implementation of the model object '<em><b>Variable</b></em>'. <!-- end-user-doc -->
 * <p>
 * The following features are implemented:
 * </p>
 * <ul>
 * <li>{@link org.eclipse.sirius.components.view.diagram.impl.DiagramVariableImpl#getName <em>Name</em>}</li>
 * <li>{@link org.eclipse.sirius.components.view.diagram.impl.DiagramVariableImpl#getDefaultValueExpression <em>Default
 * Value Expression</em>}</li>
 * </ul>
 *
 * @generated
 */
public class DiagramVariableImpl extends MinimalEObjectImpl.Container implements DiagramVariable {
    /**
     * The default value of the '{@link #getName() <em>Name</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
     * -->
     *
     * @see #getName()
     * @generated
     * @ordered
     */
    protected static final String NAME_EDEFAULT = null;

    /**
     * The cached value of the '{@link #getName() <em>Name</em>}' attribute. <!-- begin-user-doc --> <!-- end-user-doc
     * -->
     *
     * @see #getName()
     * @generated
     * @ordered
     */
    protected String name = NAME_EDEFAULT;

    /**
     * The default value of the '{@link #getDefaultValueExpression() <em>Default Value Expression</em>}' attribute. <!--
     * begin-user-doc --> <!-- end-user-doc -->
     *
     * @see #getDefaultValueExpression()
     * @generated
     * @ordered
     */
    protected static final String DEFAULT_VALUE_EXPRESSION_EDEFAULT = null;

    /**
     * The cached value of the '{@link #getDefaultValueExpression() <em>Default Value Expression</em>}' attribute. <!--
     * begin-user-doc --> <!-- end-user-doc -->
     *
     * @see #getDefaultValueExpression()
     * @generated
     * @ordered
     */
    protected String defaultValueExpression = DEFAULT_VALUE_EXPRESSION_EDEFAULT;

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    protected DiagramVariableImpl() {
        super();
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    protected EClass eStaticClass() {
        return DiagramPackage.Literals.DIAGRAM_VARIABLE;
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public String getName() {
        return this.name;
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public void setName(String newName) {
        String oldName = this.name;
        this.name = newName;
        if (this.eNotificationRequired())
            this.eNotify(new ENotificationImpl(this, Notification.SET, DiagramPackage.DIAGRAM_VARIABLE__NAME, oldName, this.name));
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public String getDefaultValueExpression() {
        return this.defaultValueExpression;
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public void setDefaultValueExpression(String newDefaultValueExpression) {
        String oldDefaultValueExpression = this.defaultValueExpression;
        this.defaultValueExpression = newDefaultValueExpression;
        if (this.eNotificationRequired())
            this.eNotify(new ENotificationImpl(this, Notification.SET, DiagramPackage.DIAGRAM_VARIABLE__DEFAULT_VALUE_EXPRESSION, oldDefaultValueExpression, this.defaultValueExpression));
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public Object eGet(int featureID, boolean resolve, boolean coreType) {
        switch (featureID) {
            case DiagramPackage.DIAGRAM_VARIABLE__NAME:
                return this.getName();
            case DiagramPackage.DIAGRAM_VARIABLE__DEFAULT_VALUE_EXPRESSION:
                return this.getDefaultValueExpression();
        }
        return super.eGet(featureID, resolve, coreType);
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public void eSet(int featureID, Object newValue) {
        switch (featureID) {
            case DiagramPackage.DIAGRAM_VARIABLE__NAME:
                this.setName((String) newValue);
                return;
            case DiagramPackage.DIAGRAM_VARIABLE__DEFAULT_VALUE_EXPRESSION:
                this.setDefaultValueExpression((String) newValue);
                return;
        }
        super.eSet(featureID, newValue);
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public void eUnset(int featureID) {
        switch (featureID) {
            case DiagramPackage.DIAGRAM_VARIABLE__NAME:
                this.setName(NAME_EDEFAULT);
                return;
            case DiagramPackage.DIAGRAM_VARIABLE__DEFAULT_VALUE_EXPRESSION:
                this.setDefaultValueExpression(DEFAULT_VALUE_EXPRESSION_EDEFAULT);
                return;
        }
        super.eUnset(featureID);
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public boolean eIsSet(int featureID) {
        switch (featureID) {
            case DiagramPackage.DIAGRAM_VARIABLE__NAME:
                return NAME_EDEFAULT == null ? this.name != null : !NAME_EDEFAULT.equals(this.name);
            case DiagramPackage.DIAGRAM_VARIABLE__DEFAULT_VALUE_EXPRESSION:
                return DEFAULT_VALUE_EXPRESSION_EDEFAULT == null ? this.defaultValueExpression != null : !DEFAULT_VALUE_EXPRESSION_EDEFAULT.equals(this.defaultValueExpression);
        }
        return super.eIsSet(featureID);
    }

    /**
     * <!-- begin-user-doc --> <!-- end-user-doc -->
     *
     * @generated
     */
    @Override
    public String toString() {
        if (this.eIsProxy())
            return super.toString();

        StringBuilder result = new StringBuilder(super.toString());
        result.append(" (name: ");
        result.append(this.name);
        result.append(", defaultValueExpression: ");
        result.append(this.defaultValueExpression);
        result.append(')');
        return result.toString();
    }

} // DiagramVariableImpl

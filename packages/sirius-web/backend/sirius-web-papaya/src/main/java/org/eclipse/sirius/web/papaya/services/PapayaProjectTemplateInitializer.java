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
package org.eclipse.sirius.web.papaya.services;

import java.util.Objects;
import java.util.Optional;

import org.eclipse.sirius.components.core.RepresentationMetadata;
import org.eclipse.sirius.components.core.api.IEditingContext;
import org.eclipse.sirius.components.emf.services.api.IEMFEditingContext;
import org.eclipse.sirius.web.application.project.services.api.IProjectTemplateInitializer;
import org.eclipse.sirius.web.papaya.factories.EMFProjectFactory;
import org.eclipse.sirius.web.papaya.factories.JavaProjectFactory;
import org.eclipse.sirius.web.papaya.factories.ReactiveStreamsProjectFactory;
import org.eclipse.sirius.web.papaya.factories.ReactorProjectFactory;
import org.eclipse.sirius.web.papaya.factories.SiriusWebProjectFactory;
import org.eclipse.sirius.web.papaya.factories.SpringProjectFactory;
import org.eclipse.sirius.web.papaya.factories.services.EObjectIndexer;
import org.springframework.stereotype.Service;

/**
 * Used to initialize a Papaya project.
 *
 * @author sbegaudeau
 */
@Service
public class PapayaProjectTemplateInitializer implements IProjectTemplateInitializer {

    @Override
    public boolean canHandle(String projectTemplateId) {
        return Objects.equals(PapayaProjectTemplateProvider.SIRIUS_WEB_PROJECT_TEMPLATE_ID, projectTemplateId);
    }

    @Override
    public Optional<RepresentationMetadata> handle(String projectTemplateId, IEditingContext editingContext) {
        if (editingContext instanceof IEMFEditingContext emfEditingContext) {
            new JavaProjectFactory().create(emfEditingContext);
            new ReactiveStreamsProjectFactory().create(emfEditingContext);
            new ReactorProjectFactory().create(emfEditingContext);
            new SpringProjectFactory().create(emfEditingContext);
            new EMFProjectFactory().create(emfEditingContext);
            new SiriusWebProjectFactory().create(emfEditingContext);

            var eObjectIndexer = new EObjectIndexer();
            eObjectIndexer.index(emfEditingContext.getDomain().getResourceSet());

            new JavaProjectFactory().link(eObjectIndexer);
            new ReactiveStreamsProjectFactory().link(eObjectIndexer);
            new ReactorProjectFactory().link(eObjectIndexer);
            new SpringProjectFactory().link(eObjectIndexer);
            new EMFProjectFactory().link(eObjectIndexer);
            new SiriusWebProjectFactory().link(eObjectIndexer);

        }
        return Optional.empty();
    }
}

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

package org.eclipse.sirius.web.domain.boundedcontexts.representationdata.services.api;

import java.util.Optional;
import java.util.UUID;

import org.eclipse.sirius.web.domain.boundedcontexts.representationdata.RepresentationContent;
import org.eclipse.sirius.web.domain.boundedcontexts.representationdata.RepresentationMetadata;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

/**
 * Used to find representation content.
 *
 * @author gcoutable
 */
public interface IRepresentationContentSearchService {

    Optional<RepresentationContent> findContentByRepresentationMetadata(AggregateReference<RepresentationMetadata, UUID> representationMetadata);

    boolean contentExistsByRepresentationMetadata(AggregateReference<RepresentationMetadata, UUID> representationMetadata);
}

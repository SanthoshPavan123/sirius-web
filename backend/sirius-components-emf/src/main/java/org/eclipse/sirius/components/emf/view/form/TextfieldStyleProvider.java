/*******************************************************************************
 * Copyright (c) 2022 Obeo.
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
package org.eclipse.sirius.components.emf.view.form;

import java.util.Objects;
import java.util.function.Function;

import org.eclipse.sirius.components.forms.TextfieldStyle;
import org.eclipse.sirius.components.forms.TextfieldStyle.Builder;
import org.eclipse.sirius.components.representations.VariableManager;
import org.eclipse.sirius.components.view.TextfieldDescriptionStyle;

/**
 * The style provider for the Textfield Description widget of the View DSL.
 *
 * @author arichard
 */
public class TextfieldStyleProvider implements Function<VariableManager, TextfieldStyle> {

    private final TextfieldDescriptionStyle viewStyle;

    public TextfieldStyleProvider(TextfieldDescriptionStyle viewStyle) {
        this.viewStyle = Objects.requireNonNull(viewStyle);
    }

    @Override
    public TextfieldStyle apply(VariableManager variableManager) {
        Builder textfieldStyleBuilder = TextfieldStyle.newTextfieldStyle();

        String backgroundColor = this.viewStyle.getBackgroundColor();
        if (backgroundColor != null && !backgroundColor.isBlank()) {
            textfieldStyleBuilder.backgroundColor(backgroundColor);
        }
        String foregroundColor = this.viewStyle.getForegroundColor();
        if (foregroundColor != null && !foregroundColor.isBlank()) {
            textfieldStyleBuilder.foregroundColor(foregroundColor);
        }
        int fontSize = this.viewStyle.getFontSize();
        boolean italic = this.viewStyle.isItalic();
        boolean bold = this.viewStyle.isBold();
        boolean underline = this.viewStyle.isUnderline();
        boolean strikeThrough = this.viewStyle.isStrikeThrough();

        // @formatter:off
        return textfieldStyleBuilder
                .fontSize(fontSize)
                .italic(italic)
                .bold(bold)
                .underline(underline)
                .strikeThrough(strikeThrough)
                .build();
        // @formatter:on
    }

}
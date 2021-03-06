/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="@angular/compiler-cli/src/ngtsc/annotations/src/references_registry" />
import * as ts from 'typescript';
import { Declaration, ReflectionHost } from '../../host';
import { Reference } from '../../metadata';
/**
 * This is a place for DecoratorHandlers to register references that they
 * find in their analysis of the code.
 * This allows us to ensure that these references are publicly exported,
 * if necessary.
 */
export declare class ReferencesRegistry {
    private host;
    private references;
    constructor(host: ReflectionHost);
    /**
     * Register one or more references in the registry.
     * Only `ResolveReference` references are stored. Other types are ignored.
     * @param references A collection of references to register.
     */
    add(...references: Reference<ts.Declaration>[]): void;
    /**
     * Create and return a mapping for the registered resolved references.
     * @returns A map of reference identifiers to reference declarations.
     */
    getDeclarationMap(): Map<ts.Identifier, Declaration>;
}

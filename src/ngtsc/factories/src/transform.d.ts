/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
export interface FactoryInfo {
    sourceFilePath: string;
    moduleSymbolNames: Set<string>;
}
export declare function generatedFactoryTransform(factoryMap: Map<string, FactoryInfo>, coreImportsFrom: ts.SourceFile | null): ts.TransformerFactory<ts.SourceFile>;

"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ts = require("typescript");
const path_1 = require("../../util/src/path");
const STRIP_NG_FACTORY = /(.*)NgFactory$/;
function generatedFactoryTransform(factoryMap, coreImportsFrom) {
    return (context) => {
        return (file) => {
            return transformFactorySourceFile(factoryMap, context, coreImportsFrom, file);
        };
    };
}
exports.generatedFactoryTransform = generatedFactoryTransform;
function transformFactorySourceFile(factoryMap, context, coreImportsFrom, file) {
    // If this is not a generated file, it won't have factory info associated with it.
    if (!factoryMap.has(file.fileName)) {
        // Don't transform non-generated code.
        return file;
    }
    const { moduleSymbolNames, sourceFilePath } = factoryMap.get(file.fileName);
    const clone = ts.getMutableClone(file);
    const transformedStatements = file.statements.map(stmt => {
        if (coreImportsFrom !== null && ts.isImportDeclaration(stmt) &&
            ts.isStringLiteral(stmt.moduleSpecifier) && stmt.moduleSpecifier.text === '@angular/core') {
            const path = path_1.relativePathBetween(sourceFilePath, coreImportsFrom.fileName);
            if (path !== null) {
                return ts.updateImportDeclaration(stmt, stmt.decorators, stmt.modifiers, stmt.importClause, ts.createStringLiteral(path));
            }
            else {
                return ts.createNotEmittedStatement(stmt);
            }
        }
        else if (ts.isVariableStatement(stmt) && stmt.declarationList.declarations.length === 1) {
            const decl = stmt.declarationList.declarations[0];
            if (ts.isIdentifier(decl.name)) {
                const match = STRIP_NG_FACTORY.exec(decl.name.text);
                if (match === null || !moduleSymbolNames.has(match[1])) {
                    // Remove the given factory as it wasn't actually for an NgModule.
                    return ts.createNotEmittedStatement(stmt);
                }
            }
            return stmt;
        }
        else {
            return stmt;
        }
    });
    if (!transformedStatements.some(ts.isVariableStatement)) {
        // If the resulting file has no factories, include an empty export to
        // satisfy closure compiler.
        transformedStatements.push(ts.createVariableStatement([ts.createModifier(ts.SyntaxKind.ExportKeyword)], ts.createVariableDeclarationList([ts.createVariableDeclaration('ɵNonEmptyModule', undefined, ts.createTrue())], ts.NodeFlags.Const)));
    }
    clone.statements = ts.createNodeArray(transformedStatements);
    return clone;
}
//# sourceMappingURL=transform.js.map
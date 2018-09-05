"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A wrapper around a `ts.CompilerHost` which supports generated files.
 */
class GeneratedFactoryHostWrapper {
    constructor(delegate, generator, factoryToSourceMap) {
        this.delegate = delegate;
        this.generator = generator;
        this.factoryToSourceMap = factoryToSourceMap;
        if (delegate.resolveTypeReferenceDirectives) {
            this.resolveTypeReferenceDirectives = (names, containingFile) => delegate.resolveTypeReferenceDirectives(names, containingFile);
        }
    }
    getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile) {
        const canonical = this.getCanonicalFileName(fileName);
        if (this.factoryToSourceMap.has(canonical)) {
            const sourceFileName = this.getCanonicalFileName(this.factoryToSourceMap.get(canonical));
            const sourceFile = this.delegate.getSourceFile(sourceFileName, languageVersion, onError, shouldCreateNewSourceFile);
            if (sourceFile === undefined) {
                return undefined;
            }
            return this.generator.factoryFor(sourceFile, fileName);
        }
        return this.delegate.getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile);
    }
    getDefaultLibFileName(options) {
        return this.delegate.getDefaultLibFileName(options);
    }
    writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles) {
        return this.delegate.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
    }
    getCurrentDirectory() { return this.delegate.getCurrentDirectory(); }
    getDirectories(path) { return this.delegate.getDirectories(path); }
    getCanonicalFileName(fileName) {
        return this.delegate.getCanonicalFileName(fileName);
    }
    useCaseSensitiveFileNames() { return this.delegate.useCaseSensitiveFileNames(); }
    getNewLine() { return this.delegate.getNewLine(); }
    fileExists(fileName) {
        return this.factoryToSourceMap.has(fileName) || this.delegate.fileExists(fileName);
    }
    readFile(fileName) { return this.delegate.readFile(fileName); }
}
exports.GeneratedFactoryHostWrapper = GeneratedFactoryHostWrapper;
//# sourceMappingURL=host.js.map
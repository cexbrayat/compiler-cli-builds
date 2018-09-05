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
/**
 * An implementation of the `Program` API which behaves like plain `tsc` and does not include any
 * Angular-specific behavior whatsoever.
 *
 * This allows `ngc` to behave like `tsc` in cases where JIT code needs to be tested.
 */
class TscPassThroughProgram {
    constructor(rootNames, options, host, oldProgram) {
        this.options = options;
        this.host = host;
        this.tsProgram =
            ts.createProgram(rootNames, options, host, oldProgram && oldProgram.getTsProgram());
    }
    getTsProgram() { return this.tsProgram; }
    getTsOptionDiagnostics(cancellationToken) {
        return this.tsProgram.getOptionsDiagnostics(cancellationToken);
    }
    getNgOptionDiagnostics(cancellationToken) {
        return [];
    }
    getTsSyntacticDiagnostics(sourceFile, cancellationToken) {
        return this.tsProgram.getSyntacticDiagnostics(sourceFile, cancellationToken);
    }
    getNgStructuralDiagnostics(cancellationToken) {
        return [];
    }
    getTsSemanticDiagnostics(sourceFile, cancellationToken) {
        return this.tsProgram.getSemanticDiagnostics(sourceFile, cancellationToken);
    }
    getNgSemanticDiagnostics(fileName, cancellationToken) {
        return [];
    }
    loadNgStructureAsync() { return Promise.resolve(); }
    listLazyRoutes(entryRoute) {
        throw new Error('Method not implemented.');
    }
    getLibrarySummaries() {
        throw new Error('Method not implemented.');
    }
    getEmittedGeneratedFiles() {
        throw new Error('Method not implemented.');
    }
    getEmittedSourceFiles() {
        throw new Error('Method not implemented.');
    }
    emit(opts) {
        const emitCallback = opts && opts.emitCallback || defaultEmitCallback;
        const emitResult = emitCallback({
            program: this.tsProgram,
            host: this.host,
            options: this.options,
            emitOnlyDtsFiles: false,
        });
        return emitResult;
    }
}
exports.TscPassThroughProgram = TscPassThroughProgram;
const defaultEmitCallback = ({ program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers }) => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
//# sourceMappingURL=tsc_pass_through.js.map
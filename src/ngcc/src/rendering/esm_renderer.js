(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngcc/src/rendering/esm_renderer", ["require", "exports", "tslib", "typescript", "@angular/compiler-cli/src/ngcc/src/host/ngcc_host", "@angular/compiler-cli/src/ngcc/src/rendering/renderer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var ngcc_host_1 = require("@angular/compiler-cli/src/ngcc/src/host/ngcc_host");
    var renderer_1 = require("@angular/compiler-cli/src/ngcc/src/rendering/renderer");
    var EsmRenderer = /** @class */ (function (_super) {
        tslib_1.__extends(EsmRenderer, _super);
        function EsmRenderer(host, isCore, rewriteCoreImportsTo, sourcePath, targetPath, transformDts) {
            var _this = _super.call(this, host, isCore, rewriteCoreImportsTo, sourcePath, targetPath, transformDts) || this;
            _this.host = host;
            _this.isCore = isCore;
            _this.rewriteCoreImportsTo = rewriteCoreImportsTo;
            _this.sourcePath = sourcePath;
            _this.targetPath = targetPath;
            return _this;
        }
        /**
         *  Add the imports at the top of the file
         */
        EsmRenderer.prototype.addImports = function (output, imports) {
            // The imports get inserted at the very top of the file.
            imports.forEach(function (i) { output.appendLeft(0, "import * as " + i.as + " from '" + i.name + "';\n"); });
        };
        EsmRenderer.prototype.addConstants = function (output, constants, file) {
            if (constants === '') {
                return;
            }
            var insertionPoint = file.statements.reduce(function (prev, stmt) {
                if (ts.isImportDeclaration(stmt) || ts.isImportEqualsDeclaration(stmt) ||
                    ts.isNamespaceImport(stmt)) {
                    return stmt.getEnd();
                }
                return prev;
            }, 0);
            output.appendLeft(insertionPoint, '\n' + constants + '\n');
        };
        /**
         * Add the definitions to each decorated class
         */
        EsmRenderer.prototype.addDefinitions = function (output, compiledClass, definitions) {
            var classSymbol = this.host.getClassSymbol(compiledClass.declaration);
            if (!classSymbol) {
                throw new Error("Compiled class does not have a valid symbol: " + compiledClass.name);
            }
            var insertionPoint = classSymbol.valueDeclaration.getEnd();
            output.appendLeft(insertionPoint, '\n' + definitions);
        };
        /**
         * Remove static decorator properties from classes
         */
        EsmRenderer.prototype.removeDecorators = function (output, decoratorsToRemove) {
            decoratorsToRemove.forEach(function (nodesToRemove, containerNode) {
                if (ts.isArrayLiteralExpression(containerNode)) {
                    var items = containerNode.elements;
                    if (items.length === nodesToRemove.length) {
                        // Remove the entire statement
                        var statement = findStatement(containerNode);
                        if (statement) {
                            output.remove(statement.getFullStart(), statement.getEnd());
                        }
                    }
                    else {
                        nodesToRemove.forEach(function (node) {
                            // remove any trailing comma
                            var end = (output.slice(node.getEnd(), node.getEnd() + 1) === ',') ?
                                node.getEnd() + 1 :
                                node.getEnd();
                            output.remove(node.getFullStart(), end);
                        });
                    }
                }
            });
        };
        EsmRenderer.prototype.rewriteSwitchableDeclarations = function (outputText, sourceFile, declarations) {
            declarations.forEach(function (declaration) {
                var start = declaration.initializer.getStart();
                var end = declaration.initializer.getEnd();
                var replacement = declaration.initializer.text.replace(ngcc_host_1.PRE_NGCC_MARKER, ngcc_host_1.POST_NGCC_MARKER);
                outputText.overwrite(start, end, replacement);
            });
        };
        return EsmRenderer;
    }(renderer_1.Renderer));
    exports.EsmRenderer = EsmRenderer;
    function findStatement(node) {
        while (node) {
            if (ts.isExpressionStatement(node)) {
                return node;
            }
            node = node.parent;
        }
        return undefined;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNtX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ2NjL3NyYy9yZW5kZXJpbmcvZXNtX3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILCtCQUFpQztJQUVqQywrRUFBdUg7SUFFdkgsa0ZBQW9DO0lBRXBDO1FBQWlDLHVDQUFRO1FBQ3ZDLHFCQUNjLElBQXdCLEVBQVksTUFBZSxFQUNuRCxvQkFBd0MsRUFBWSxVQUFrQixFQUN0RSxVQUFrQixFQUFFLFlBQXFCO1lBSHZELFlBSUUsa0JBQU0sSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUNoRjtZQUphLFVBQUksR0FBSixJQUFJLENBQW9CO1lBQVksWUFBTSxHQUFOLE1BQU0sQ0FBUztZQUNuRCwwQkFBb0IsR0FBcEIsb0JBQW9CLENBQW9CO1lBQVksZ0JBQVUsR0FBVixVQUFVLENBQVE7WUFDdEUsZ0JBQVUsR0FBVixVQUFVLENBQVE7O1FBRWhDLENBQUM7UUFFRDs7V0FFRztRQUNILGdDQUFVLEdBQVYsVUFBVyxNQUFtQixFQUFFLE9BQXNDO1lBQ3BFLHdEQUF3RDtZQUN4RCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFNLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLGlCQUFlLENBQUMsQ0FBQyxFQUFFLGVBQVUsQ0FBQyxDQUFDLElBQUksU0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RixDQUFDO1FBRUQsa0NBQVksR0FBWixVQUFhLE1BQW1CLEVBQUUsU0FBaUIsRUFBRSxJQUFtQjtZQUN0RSxJQUFJLFNBQVMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3BCLE9BQU87YUFDUjtZQUNELElBQU0sY0FB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QWUsRUFBRSw0QkFBZ0IsQ0FBQyxDQUFDO2dCQUM1RixVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0gsa0JBQUM7SUFBRCxDQUFDLEFBOUVELENBQWlDLG1CQUFRLEdBOEV4QztJQTlFWSxrQ0FBVztJQWdGeEIsU0FBUyxhQUFhLENBQUMsSUFBYTtRQUNsQyxPQUFPLElBQUksRUFBRTtZQUNYLElBQUksRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQgTWFnaWNTdHJpbmcgZnJvbSAnbWFnaWMtc3RyaW5nJztcbmltcG9ydCB7TmdjY1JlZmxlY3Rpb25Ib3N0LCBQT1NUX05HQ0NfTUFSS0VSLCBQUkVfTkdDQ19NQVJLRVIsIFN3aXRjaGFibGVWYXJpYWJsZURlY2xhcmF0aW9ufSBmcm9tICcuLi9ob3N0L25nY2NfaG9zdCc7XG5pbXBvcnQge0NvbXBpbGVkQ2xhc3N9IGZyb20gJy4uL2FuYWx5c2lzL2RlY29yYXRpb25fYW5hbHl6ZXInO1xuaW1wb3J0IHtSZW5kZXJlcn0gZnJvbSAnLi9yZW5kZXJlcic7XG5cbmV4cG9ydCBjbGFzcyBFc21SZW5kZXJlciBleHRlbmRzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcm90ZWN0ZWQgaG9zdDogTmdjY1JlZmxlY3Rpb25Ib3N0LCBwcm90ZWN0ZWQgaXNDb3JlOiBib29sZWFuLFxuICAgICAgcHJvdGVjdGVkIHJld3JpdGVDb3JlSW1wb3J0c1RvOiB0cy5Tb3VyY2VGaWxlfG51bGwsIHByb3RlY3RlZCBzb3VyY2VQYXRoOiBzdHJpbmcsXG4gICAgICBwcm90ZWN0ZWQgdGFyZ2V0UGF0aDogc3RyaW5nLCB0cmFuc2Zvcm1EdHM6IGJvb2xlYW4pIHtcbiAgICBzdXBlcihob3N0LCBpc0NvcmUsIHJld3JpdGVDb3JlSW1wb3J0c1RvLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCB0cmFuc2Zvcm1EdHMpO1xuICB9XG5cbiAgLyoqXG4gICAqICBBZGQgdGhlIGltcG9ydHMgYXQgdGhlIHRvcCBvZiB0aGUgZmlsZVxuICAgKi9cbiAgYWRkSW1wb3J0cyhvdXRwdXQ6IE1hZ2ljU3RyaW5nLCBpbXBvcnRzOiB7bmFtZTogc3RyaW5nOyBhczogc3RyaW5nO31bXSk6IHZvaWQge1xuICAgIC8vIFRoZSBpbXBvcnRzIGdldCBpbnNlcnRlZCBhdCB0aGUgdmVyeSB0b3Agb2YgdGhlIGZpbGUuXG4gICAgaW1wb3J0cy5mb3JFYWNoKGkgPT4geyBvdXRwdXQuYXBwZW5kTGVmdCgwLCBgaW1wb3J0ICogYXMgJHtpLmFzfSBmcm9tICcke2kubmFtZX0nO1xcbmApOyB9KTtcbiAgfVxuXG4gIGFkZENvbnN0YW50cyhvdXRwdXQ6IE1hZ2ljU3RyaW5nLCBjb25zdGFudHM6IHN0cmluZywgZmlsZTogdHMuU291cmNlRmlsZSk6IHZvaWQge1xuICAgIGlmIChjb25zdGFudHMgPT09ICcnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluc2VydGlvblBvaW50ID0gZmlsZS5zdGF0ZW1lbnRzLnJlZHVjZSgocHJldiwgc3RtdCkgPT4ge1xuICAgICAgaWYgKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24oc3RtdCkgfHwgdHMuaXNJbXBvcnRFcXVhbHNEZWNsYXJhdGlvbihzdG10KSB8fFxuICAgICAgICAgIHRzLmlzTmFtZXNwYWNlSW1wb3J0KHN0bXQpKSB7XG4gICAgICAgIHJldHVybiBzdG10LmdldEVuZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgMCk7XG4gICAgb3V0cHV0LmFwcGVuZExlZnQoaW5zZXJ0aW9uUG9pbnQsICdcXG4nICsgY29uc3RhbnRzICsgJ1xcbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgZGVmaW5pdGlvbnMgdG8gZWFjaCBkZWNvcmF0ZWQgY2xhc3NcbiAgICovXG4gIGFkZERlZmluaXRpb25zKG91dHB1dDogTWFnaWNTdHJpbmcsIGNvbXBpbGVkQ2xhc3M6IENvbXBpbGVkQ2xhc3MsIGRlZmluaXRpb25zOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBjbGFzc1N5bWJvbCA9IHRoaXMuaG9zdC5nZXRDbGFzc1N5bWJvbChjb21waWxlZENsYXNzLmRlY2xhcmF0aW9uKTtcbiAgICBpZiAoIWNsYXNzU3ltYm9sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvbXBpbGVkIGNsYXNzIGRvZXMgbm90IGhhdmUgYSB2YWxpZCBzeW1ib2w6ICR7Y29tcGlsZWRDbGFzcy5uYW1lfWApO1xuICAgIH1cbiAgICBjb25zdCBpbnNlcnRpb25Qb2ludCA9IGNsYXNzU3ltYm9sLnZhbHVlRGVjbGFyYXRpb24gIS5nZXRFbmQoKTtcbiAgICBvdXRwdXQuYXBwZW5kTGVmdChpbnNlcnRpb25Qb2ludCwgJ1xcbicgKyBkZWZpbml0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIHN0YXRpYyBkZWNvcmF0b3IgcHJvcGVydGllcyBmcm9tIGNsYXNzZXNcbiAgICovXG4gIHJlbW92ZURlY29yYXRvcnMob3V0cHV0OiBNYWdpY1N0cmluZywgZGVjb3JhdG9yc1RvUmVtb3ZlOiBNYXA8dHMuTm9kZSwgdHMuTm9kZVtdPik6IHZvaWQge1xuICAgIGRlY29yYXRvcnNUb1JlbW92ZS5mb3JFYWNoKChub2Rlc1RvUmVtb3ZlLCBjb250YWluZXJOb2RlKSA9PiB7XG4gICAgICBpZiAodHMuaXNBcnJheUxpdGVyYWxFeHByZXNzaW9uKGNvbnRhaW5lck5vZGUpKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gY29udGFpbmVyTm9kZS5lbGVtZW50cztcbiAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gbm9kZXNUb1JlbW92ZS5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIGVudGlyZSBzdGF0ZW1lbnRcbiAgICAgICAgICBjb25zdCBzdGF0ZW1lbnQgPSBmaW5kU3RhdGVtZW50KGNvbnRhaW5lck5vZGUpO1xuICAgICAgICAgIGlmIChzdGF0ZW1lbnQpIHtcbiAgICAgICAgICAgIG91dHB1dC5yZW1vdmUoc3RhdGVtZW50LmdldEZ1bGxTdGFydCgpLCBzdGF0ZW1lbnQuZ2V0RW5kKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBub2Rlc1RvUmVtb3ZlLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAvLyByZW1vdmUgYW55IHRyYWlsaW5nIGNvbW1hXG4gICAgICAgICAgICBjb25zdCBlbmQgPSAob3V0cHV0LnNsaWNlKG5vZGUuZ2V0RW5kKCksIG5vZGUuZ2V0RW5kKCkgKyAxKSA9PT0gJywnKSA/XG4gICAgICAgICAgICAgICAgbm9kZS5nZXRFbmQoKSArIDEgOlxuICAgICAgICAgICAgICAgIG5vZGUuZ2V0RW5kKCk7XG4gICAgICAgICAgICBvdXRwdXQucmVtb3ZlKG5vZGUuZ2V0RnVsbFN0YXJ0KCksIGVuZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJld3JpdGVTd2l0Y2hhYmxlRGVjbGFyYXRpb25zKFxuICAgICAgb3V0cHV0VGV4dDogTWFnaWNTdHJpbmcsIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gICAgICBkZWNsYXJhdGlvbnM6IFN3aXRjaGFibGVWYXJpYWJsZURlY2xhcmF0aW9uW10pOiB2b2lkIHtcbiAgICBkZWNsYXJhdGlvbnMuZm9yRWFjaChkZWNsYXJhdGlvbiA9PiB7XG4gICAgICBjb25zdCBzdGFydCA9IGRlY2xhcmF0aW9uLmluaXRpYWxpemVyLmdldFN0YXJ0KCk7XG4gICAgICBjb25zdCBlbmQgPSBkZWNsYXJhdGlvbi5pbml0aWFsaXplci5nZXRFbmQoKTtcbiAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gZGVjbGFyYXRpb24uaW5pdGlhbGl6ZXIudGV4dC5yZXBsYWNlKFBSRV9OR0NDX01BUktFUiwgUE9TVF9OR0NDX01BUktFUik7XG4gICAgICBvdXRwdXRUZXh0Lm92ZXJ3cml0ZShzdGFydCwgZW5kLCByZXBsYWNlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZFN0YXRlbWVudChub2RlOiB0cy5Ob2RlKSB7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgaWYgKHRzLmlzRXhwcmVzc2lvblN0YXRlbWVudChub2RlKSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfVxuICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIl19
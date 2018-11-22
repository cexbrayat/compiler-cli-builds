(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngcc/src/analysis/private_declarations_analyzer", ["require", "exports", "typescript", "@angular/compiler-cli/src/ngcc/src/utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ts = require("typescript");
    var utils_1 = require("@angular/compiler-cli/src/ngcc/src/utils");
    /**
     * This class will analyze a program to find all the declared classes
     * (i.e. on an NgModule) that are not publicly exported via an entry-point.
     */
    var PrivateDeclarationsAnalyzer = /** @class */ (function () {
        function PrivateDeclarationsAnalyzer(host, referencesRegistry) {
            this.host = host;
            this.referencesRegistry = referencesRegistry;
        }
        PrivateDeclarationsAnalyzer.prototype.analyzeProgram = function (program) {
            var rootFiles = this.getRootFiles(program);
            return this.getPrivateDeclarations(rootFiles, this.referencesRegistry.getDeclarationMap());
        };
        PrivateDeclarationsAnalyzer.prototype.getRootFiles = function (program) {
            return program.getRootFileNames().map(function (f) { return program.getSourceFile(f); }).filter(utils_1.isDefined);
        };
        PrivateDeclarationsAnalyzer.prototype.getPrivateDeclarations = function (rootFiles, declarations) {
            var _this = this;
            var privateDeclarations = new Map(declarations);
            rootFiles.forEach(function (f) {
                var exports = _this.host.getExportsOfModule(f);
                if (exports) {
                    exports.forEach(function (declaration, exportedName) {
                        if (hasNameIdentifier(declaration.node) && declaration.node.name.text === exportedName) {
                            privateDeclarations.delete(declaration.node.name);
                        }
                    });
                }
            });
            return Array.from(privateDeclarations.keys()).map(function (id) {
                var from = id.getSourceFile().fileName;
                var declaration = privateDeclarations.get(id);
                var dtsDeclaration = _this.host.getDtsDeclarationOfClass(declaration.node);
                var dtsFrom = dtsDeclaration && dtsDeclaration.getSourceFile().fileName;
                return { identifier: id.text, from: from, dtsFrom: dtsFrom };
            });
        };
        return PrivateDeclarationsAnalyzer;
    }());
    exports.PrivateDeclarationsAnalyzer = PrivateDeclarationsAnalyzer;
    function hasNameIdentifier(declaration) {
        return ts.isIdentifier(declaration.name);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9kZWNsYXJhdGlvbnNfYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25nY2Mvc3JjL2FuYWx5c2lzL3ByaXZhdGVfZGVjbGFyYXRpb25zX2FuYWx5emVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsK0JBQWlDO0lBS2pDLGtFQUFtQztJQVNuQzs7O09BR0c7SUFDSDtRQUNFLHFDQUFvQixJQUF3QixFQUFVLGtCQUFzQztZQUF4RSxTQUFJLEdBQUosSUFBSSxDQUFvQjtZQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBRyxDQUFDO1FBRWhHLG9EQUFjLEdBQWQsVUFBZSxPQUFtQjtZQUNoQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzdGLENBQUM7UUFFTyxrREFBWSxHQUFwQixVQUFxQixPQUFtQjtZQUN0QyxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQyxNQUFNLENBQUMsaUJBQVMsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7UUFFTyw0REFBc0IsR0FBOUIsVUFDSSxTQUEwQixFQUMxQixZQUE2QztZQUZqRCxpQkFxQkM7WUFsQkMsSUFBTSxtQkFBbUIsR0FBb0MsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkYsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7Z0JBQ2pCLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELElBQUksT0FBTyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxXQUFXLEVBQUUsWUFBWTt3QkFDeEMsSUFBSSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTs0QkFDdEYsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ25EO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFO2dCQUNsRCxJQUFNLElBQUksR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUN6QyxJQUFNLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFHLENBQUM7Z0JBQ2xELElBQU0sY0FBYyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1RSxJQUFNLE9BQU8sR0FBRyxjQUFjLElBQUksY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDMUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0gsa0NBQUM7SUFBRCxDQUFDLEFBbENELElBa0NDO0lBbENZLGtFQUEyQjtJQW9DeEMsU0FBUyxpQkFBaUIsQ0FBQyxXQUEyQjtRQUVwRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUUsV0FBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5cbmltcG9ydCB7UmVmZXJlbmNlc1JlZ2lzdHJ5fSBmcm9tICcuLi8uLi8uLi9uZ3RzYy9hbm5vdGF0aW9ucyc7XG5pbXBvcnQge0RlY2xhcmF0aW9ufSBmcm9tICcuLi8uLi8uLi9uZ3RzYy9ob3N0JztcbmltcG9ydCB7TmdjY1JlZmxlY3Rpb25Ib3N0fSBmcm9tICcuLi9ob3N0L25nY2NfaG9zdCc7XG5pbXBvcnQge2lzRGVmaW5lZH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4cG9ydEluZm8ge1xuICBpZGVudGlmaWVyOiBzdHJpbmc7XG4gIGZyb206IHN0cmluZztcbiAgZHRzRnJvbTogc3RyaW5nfG51bGw7XG59XG5leHBvcnQgdHlwZSBQcml2YXRlRGVjbGFyYXRpb25zQW5hbHlzZXMgPSBFeHBvcnRJbmZvW107XG5cbi8qKlxuICogVGhpcyBjbGFzcyB3aWxsIGFuYWx5emUgYSBwcm9ncmFtIHRvIGZpbmQgYWxsIHRoZSBkZWNsYXJlZCBjbGFzc2VzXG4gKiAoaS5lLiBvbiBhbiBOZ01vZHVsZSkgdGhhdCBhcmUgbm90IHB1YmxpY2x5IGV4cG9ydGVkIHZpYSBhbiBlbnRyeS1wb2ludC5cbiAqL1xuZXhwb3J0IGNsYXNzIFByaXZhdGVEZWNsYXJhdGlvbnNBbmFseXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogTmdjY1JlZmxlY3Rpb25Ib3N0LCBwcml2YXRlIHJlZmVyZW5jZXNSZWdpc3RyeTogUmVmZXJlbmNlc1JlZ2lzdHJ5KSB7fVxuXG4gIGFuYWx5emVQcm9ncmFtKHByb2dyYW06IHRzLlByb2dyYW0pOiBQcml2YXRlRGVjbGFyYXRpb25zQW5hbHlzZXMge1xuICAgIGNvbnN0IHJvb3RGaWxlcyA9IHRoaXMuZ2V0Um9vdEZpbGVzKHByb2dyYW0pO1xuICAgIHJldHVybiB0aGlzLmdldFByaXZhdGVEZWNsYXJhdGlvbnMocm9vdEZpbGVzLCB0aGlzLnJlZmVyZW5jZXNSZWdpc3RyeS5nZXREZWNsYXJhdGlvbk1hcCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Um9vdEZpbGVzKHByb2dyYW06IHRzLlByb2dyYW0pOiB0cy5Tb3VyY2VGaWxlW10ge1xuICAgIHJldHVybiBwcm9ncmFtLmdldFJvb3RGaWxlTmFtZXMoKS5tYXAoZiA9PiBwcm9ncmFtLmdldFNvdXJjZUZpbGUoZikpLmZpbHRlcihpc0RlZmluZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcml2YXRlRGVjbGFyYXRpb25zKFxuICAgICAgcm9vdEZpbGVzOiB0cy5Tb3VyY2VGaWxlW10sXG4gICAgICBkZWNsYXJhdGlvbnM6IE1hcDx0cy5JZGVudGlmaWVyLCBEZWNsYXJhdGlvbj4pOiBQcml2YXRlRGVjbGFyYXRpb25zQW5hbHlzZXMge1xuICAgIGNvbnN0IHByaXZhdGVEZWNsYXJhdGlvbnM6IE1hcDx0cy5JZGVudGlmaWVyLCBEZWNsYXJhdGlvbj4gPSBuZXcgTWFwKGRlY2xhcmF0aW9ucyk7XG4gICAgcm9vdEZpbGVzLmZvckVhY2goZiA9PiB7XG4gICAgICBjb25zdCBleHBvcnRzID0gdGhpcy5ob3N0LmdldEV4cG9ydHNPZk1vZHVsZShmKTtcbiAgICAgIGlmIChleHBvcnRzKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaCgoZGVjbGFyYXRpb24sIGV4cG9ydGVkTmFtZSkgPT4ge1xuICAgICAgICAgIGlmIChoYXNOYW1lSWRlbnRpZmllcihkZWNsYXJhdGlvbi5ub2RlKSAmJiBkZWNsYXJhdGlvbi5ub2RlLm5hbWUudGV4dCA9PT0gZXhwb3J0ZWROYW1lKSB7XG4gICAgICAgICAgICBwcml2YXRlRGVjbGFyYXRpb25zLmRlbGV0ZShkZWNsYXJhdGlvbi5ub2RlLm5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocHJpdmF0ZURlY2xhcmF0aW9ucy5rZXlzKCkpLm1hcChpZCA9PiB7XG4gICAgICBjb25zdCBmcm9tID0gaWQuZ2V0U291cmNlRmlsZSgpLmZpbGVOYW1lO1xuICAgICAgY29uc3QgZGVjbGFyYXRpb24gPSBwcml2YXRlRGVjbGFyYXRpb25zLmdldChpZCkgITtcbiAgICAgIGNvbnN0IGR0c0RlY2xhcmF0aW9uID0gdGhpcy5ob3N0LmdldER0c0RlY2xhcmF0aW9uT2ZDbGFzcyhkZWNsYXJhdGlvbi5ub2RlKTtcbiAgICAgIGNvbnN0IGR0c0Zyb20gPSBkdHNEZWNsYXJhdGlvbiAmJiBkdHNEZWNsYXJhdGlvbi5nZXRTb3VyY2VGaWxlKCkuZmlsZU5hbWU7XG4gICAgICByZXR1cm4ge2lkZW50aWZpZXI6IGlkLnRleHQsIGZyb20sIGR0c0Zyb219O1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc05hbWVJZGVudGlmaWVyKGRlY2xhcmF0aW9uOiB0cy5EZWNsYXJhdGlvbik6IGRlY2xhcmF0aW9uIGlzIHRzLkRlY2xhcmF0aW9uJlxuICAgIHtuYW1lOiB0cy5JZGVudGlmaWVyfSB7XG4gIHJldHVybiB0cy5pc0lkZW50aWZpZXIoKGRlY2xhcmF0aW9uIGFzIGFueSkubmFtZSk7XG59XG4iXX0=
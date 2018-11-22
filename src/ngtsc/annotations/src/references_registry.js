/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngtsc/annotations/src/references_registry", ["require", "exports", "typescript", "@angular/compiler-cli/src/ngtsc/metadata"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("typescript");
    var metadata_1 = require("@angular/compiler-cli/src/ngtsc/metadata");
    /**
     * This is a place for DecoratorHandlers to register references that they
     * find in their analysis of the code.
     * This allows us to ensure that these references are publicly exported,
     * if necessary.
     */
    var ReferencesRegistry = /** @class */ (function () {
        function ReferencesRegistry(host) {
            this.host = host;
            this.references = [];
        }
        /**
         * Register one or more references in the registry.
         * Only `ResolveReference` references are stored. Other types are ignored.
         * @param references A collection of references to register.
         */
        ReferencesRegistry.prototype.add = function () {
            var _this = this;
            var references = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                references[_i] = arguments[_i];
            }
            references.forEach(function (ref) {
                // Only store resolved references. We are not interested in literals.
                if (ref instanceof metadata_1.ResolvedReference) {
                    _this.references.push(ref);
                }
            });
        };
        /**
         * Create and return a mapping for the registered resolved references.
         * @returns A map of reference identifiers to reference declarations.
         */
        ReferencesRegistry.prototype.getDeclarationMap = function () {
            var _this = this;
            // We lazily create the map when asked for so that it doesn't slow down
            // ngtsc compilation.
            var map = new Map();
            this.references.forEach(function (ref) {
                if (hasNameIdentifier(ref.node)) {
                    var declaration = _this.host.getDeclarationOfIdentifier(ref.node.name);
                    if (declaration && hasNameIdentifier(declaration.node)) {
                        map.set(declaration.node.name, declaration);
                    }
                }
            });
            return map;
        };
        return ReferencesRegistry;
    }());
    exports.ReferencesRegistry = ReferencesRegistry;
    function hasNameIdentifier(declaration) {
        return ts.isIdentifier(declaration.name);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJlbmNlc19yZWdpc3RyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmd0c2MvYW5ub3RhdGlvbnMvc3JjL3JlZmVyZW5jZXNfcmVnaXN0cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwrQkFBaUM7SUFFakMscUVBQTREO0lBRTVEOzs7OztPQUtHO0lBQ0g7UUFHRSw0QkFBb0IsSUFBb0I7WUFBcEIsU0FBSSxHQUFKLElBQUksQ0FBZ0I7WUFGaEMsZUFBVSxHQUF3QyxFQUFFLENBQUM7UUFFbEIsQ0FBQztRQUU1Qzs7OztXQUlHO1FBQ0gsZ0NBQUcsR0FBSDtZQUFBLGlCQU9DO1lBUEcsb0JBQTBDO2lCQUExQyxVQUEwQyxFQUExQyxxQkFBMEMsRUFBMUMsSUFBMEM7Z0JBQTFDLCtCQUEwQzs7WUFDNUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3BCLHFFQUFxRTtnQkFDckUsSUFBSSxHQUFHLFlBQVksNEJBQWlCLEVBQUU7b0JBQ3BDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVEOzs7V0FHRztRQUNILDhDQUFpQixHQUFqQjtZQUFBLGlCQWFDO1lBWkMsdUVBQXVFO1lBQ3ZFLHFCQUFxQjtZQUNyQixJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBOEIsQ0FBQztZQUNsRCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7Z0JBQ3pCLElBQUksaUJBQWlCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUMvQixJQUFNLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hFLElBQUksV0FBVyxJQUFJLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDN0M7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNILHlCQUFDO0lBQUQsQ0FBQyxBQXJDRCxJQXFDQztJQXJDWSxnREFBa0I7SUF1Qy9CLFNBQVMsaUJBQWlCLENBQUMsV0FBMkI7UUFFcEQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFFLFdBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgdHMgZnJvbSAndHlwZXNjcmlwdCc7XG5pbXBvcnQge0RlY2xhcmF0aW9uLCBSZWZsZWN0aW9uSG9zdH0gZnJvbSAnLi4vLi4vaG9zdCc7XG5pbXBvcnQge1JlZmVyZW5jZSwgUmVzb2x2ZWRSZWZlcmVuY2V9IGZyb20gJy4uLy4uL21ldGFkYXRhJztcblxuLyoqXG4gKiBUaGlzIGlzIGEgcGxhY2UgZm9yIERlY29yYXRvckhhbmRsZXJzIHRvIHJlZ2lzdGVyIHJlZmVyZW5jZXMgdGhhdCB0aGV5XG4gKiBmaW5kIGluIHRoZWlyIGFuYWx5c2lzIG9mIHRoZSBjb2RlLlxuICogVGhpcyBhbGxvd3MgdXMgdG8gZW5zdXJlIHRoYXQgdGhlc2UgcmVmZXJlbmNlcyBhcmUgcHVibGljbHkgZXhwb3J0ZWQsXG4gKiBpZiBuZWNlc3NhcnkuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWZlcmVuY2VzUmVnaXN0cnkge1xuICBwcml2YXRlIHJlZmVyZW5jZXM6IFJlc29sdmVkUmVmZXJlbmNlPHRzLkRlY2xhcmF0aW9uPltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBob3N0OiBSZWZsZWN0aW9uSG9zdCkge31cblxuICAvKipcbiAgICogUmVnaXN0ZXIgb25lIG9yIG1vcmUgcmVmZXJlbmNlcyBpbiB0aGUgcmVnaXN0cnkuXG4gICAqIE9ubHkgYFJlc29sdmVSZWZlcmVuY2VgIHJlZmVyZW5jZXMgYXJlIHN0b3JlZC4gT3RoZXIgdHlwZXMgYXJlIGlnbm9yZWQuXG4gICAqIEBwYXJhbSByZWZlcmVuY2VzIEEgY29sbGVjdGlvbiBvZiByZWZlcmVuY2VzIHRvIHJlZ2lzdGVyLlxuICAgKi9cbiAgYWRkKC4uLnJlZmVyZW5jZXM6IFJlZmVyZW5jZTx0cy5EZWNsYXJhdGlvbj5bXSk6IHZvaWQge1xuICAgIHJlZmVyZW5jZXMuZm9yRWFjaChyZWYgPT4ge1xuICAgICAgLy8gT25seSBzdG9yZSByZXNvbHZlZCByZWZlcmVuY2VzLiBXZSBhcmUgbm90IGludGVyZXN0ZWQgaW4gbGl0ZXJhbHMuXG4gICAgICBpZiAocmVmIGluc3RhbmNlb2YgUmVzb2x2ZWRSZWZlcmVuY2UpIHtcbiAgICAgICAgdGhpcy5yZWZlcmVuY2VzLnB1c2gocmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW5kIHJldHVybiBhIG1hcHBpbmcgZm9yIHRoZSByZWdpc3RlcmVkIHJlc29sdmVkIHJlZmVyZW5jZXMuXG4gICAqIEByZXR1cm5zIEEgbWFwIG9mIHJlZmVyZW5jZSBpZGVudGlmaWVycyB0byByZWZlcmVuY2UgZGVjbGFyYXRpb25zLlxuICAgKi9cbiAgZ2V0RGVjbGFyYXRpb25NYXAoKTogTWFwPHRzLklkZW50aWZpZXIsIERlY2xhcmF0aW9uPiB7XG4gICAgLy8gV2UgbGF6aWx5IGNyZWF0ZSB0aGUgbWFwIHdoZW4gYXNrZWQgZm9yIHNvIHRoYXQgaXQgZG9lc24ndCBzbG93IGRvd25cbiAgICAvLyBuZ3RzYyBjb21waWxhdGlvbi5cbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwPHRzLklkZW50aWZpZXIsIERlY2xhcmF0aW9uPigpO1xuICAgIHRoaXMucmVmZXJlbmNlcy5mb3JFYWNoKHJlZiA9PiB7XG4gICAgICBpZiAoaGFzTmFtZUlkZW50aWZpZXIocmVmLm5vZGUpKSB7XG4gICAgICAgIGNvbnN0IGRlY2xhcmF0aW9uID0gdGhpcy5ob3N0LmdldERlY2xhcmF0aW9uT2ZJZGVudGlmaWVyKHJlZi5ub2RlLm5hbWUpO1xuICAgICAgICBpZiAoZGVjbGFyYXRpb24gJiYgaGFzTmFtZUlkZW50aWZpZXIoZGVjbGFyYXRpb24ubm9kZSkpIHtcbiAgICAgICAgICBtYXAuc2V0KGRlY2xhcmF0aW9uLm5vZGUubmFtZSwgZGVjbGFyYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hcDtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNOYW1lSWRlbnRpZmllcihkZWNsYXJhdGlvbjogdHMuRGVjbGFyYXRpb24pOiBkZWNsYXJhdGlvbiBpcyB0cy5EZWNsYXJhdGlvbiZcbiAgICB7bmFtZTogdHMuSWRlbnRpZmllcn0ge1xuICByZXR1cm4gdHMuaXNJZGVudGlmaWVyKChkZWNsYXJhdGlvbiBhcyBhbnkpLm5hbWUpO1xufVxuIl19
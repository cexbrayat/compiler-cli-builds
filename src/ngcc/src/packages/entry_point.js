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
        define("@angular/compiler-cli/src/ngcc/src/packages/entry_point", ["require", "exports", "canonical-path", "fs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path = require("canonical-path");
    var fs = require("fs");
    /**
     * Try to get entry point info from the given path.
     * @param pkgPath the absolute path to the containing npm package
     * @param entryPoint the absolute path to the potential entry point.
     * @returns Info about the entry point if it is valid, `null` otherwise.
     */
    function getEntryPointInfo(pkgPath, entryPoint) {
        var packageJsonPath = path.resolve(entryPoint, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return null;
        }
        // If there is `esm2015` then `es2015` will be FESM2015, otherwise ESM2015.
        // If there is `esm5` then `module` will be FESM5, otherwise it will be ESM5.
        var _a = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')), name = _a.name, modulePath = _a.module, types = _a.types, _b = _a.typings, typings = _b === void 0 ? types : _b, // synonymous
        es2015 = _a.es2015, _c = _a.fesm2015, fesm2015 = _c === void 0 ? es2015 : _c, // synonymous
        _d = _a.fesm5, // synonymous
        fesm5 = _d === void 0 ? modulePath : _d, // synonymous
        esm2015 = _a.esm2015, esm5 = _a.esm5, main = _a.main;
        // Minimum requirement is that we have fesm2015 format and typings.
        if (!typings || !fesm2015) {
            return null;
        }
        // Also we need to have a metadata.json file
        var metadataPath = path.resolve(entryPoint, typings.replace(/\.d\.ts$/, '') + '.metadata.json');
        if (!fs.existsSync(metadataPath)) {
            return null;
        }
        var entryPointInfo = {
            name: name,
            package: pkgPath,
            path: entryPoint,
            typings: path.resolve(entryPoint, typings),
            fesm2015: path.resolve(entryPoint, fesm2015),
        };
        if (esm2015) {
            entryPointInfo.esm2015 = path.resolve(entryPoint, esm2015);
        }
        if (fesm5) {
            entryPointInfo.fesm5 = path.resolve(entryPoint, fesm5);
        }
        if (esm5) {
            entryPointInfo.esm5 = path.resolve(entryPoint, esm5);
        }
        if (main) {
            entryPointInfo.umd = path.resolve(entryPoint, main);
        }
        return entryPointInfo;
    }
    exports.getEntryPointInfo = getEntryPointInfo;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci1jbGkvc3JjL25nY2Mvc3JjL3BhY2thZ2VzL2VudHJ5X3BvaW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBRUgscUNBQXVDO0lBQ3ZDLHVCQUF5QjtJQTJDekI7Ozs7O09BS0c7SUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsVUFBa0I7UUFDbkUsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELDJFQUEyRTtRQUMzRSw2RUFBNkU7UUFDdkUsSUFBQSx5REFXeUUsRUFWN0UsY0FBSSxFQUNKLHNCQUFrQixFQUNsQixnQkFBSyxFQUNMLGVBQWUsRUFBZixvQ0FBZSxFQUFHLGFBQWE7UUFDL0Isa0JBQU0sRUFDTixnQkFBaUIsRUFBakIsc0NBQWlCLEVBQUksYUFBYTtRQUNsQyxhQUFrQixFQURHLGFBQWE7UUFDbEMsdUNBQWtCLEVBQUcsYUFBYTtRQUNsQyxvQkFBTyxFQUNQLGNBQUksRUFDSixjQUM2RSxDQUFDO1FBRWhGLG1FQUFtRTtRQUNuRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCw0Q0FBNEM7UUFDNUMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBTSxjQUFjLEdBQWU7WUFDakMsSUFBSSxNQUFBO1lBQ0osT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLFVBQVU7WUFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUMxQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO1NBQzdDLENBQUM7UUFFRixJQUFJLE9BQU8sRUFBRTtZQUNYLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLEtBQUssRUFBRTtZQUNULGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLElBQUksRUFBRTtZQUNSLGNBQWMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEQ7UUFDRCxJQUFJLElBQUksRUFBRTtZQUNSLGNBQWMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDckQ7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBdERELDhDQXNEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdjYW5vbmljYWwtcGF0aCc7XG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5cblxuLyoqXG4gKiBUaGUgcG9zc2libGUgdmFsdWVzIGZvciB0aGUgZm9ybWF0IG9mIGFuIGVudHJ5LXBvaW50LlxuICovXG5leHBvcnQgdHlwZSBFbnRyeVBvaW50Rm9ybWF0ID0gJ2VzbTUnIHwgJ2Zlc201JyB8ICdlc20yMDE1JyB8ICdmZXNtMjAxNScgfCAndW1kJztcblxuLyoqXG4gKiBBbiBvYmplY3QgY29udGFpbmluZyBwYXRocyB0byB0aGUgZW50cnktcG9pbnRzIGZvciBlYWNoIGZvcm1hdC5cbiAqL1xuZXhwb3J0IHR5cGUgRW50cnlQb2ludFBhdGhzID0ge1xuICBbRm9ybWF0IGluIEVudHJ5UG9pbnRGb3JtYXRdPzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBBbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBhbiBlbnRyeS1wb2ludCwgaW5jbHVkaW5nIHBhdGhzXG4gKiB0byBlYWNoIG9mIHRoZSBwb3NzaWJsZSBlbnRyeS1wb2ludCBmb3JtYXRzLlxuICovXG5leHBvcnQgdHlwZSBFbnRyeVBvaW50ID0gRW50cnlQb2ludFBhdGhzICYge1xuICAvKiogVGhlIG5hbWUgb2YgdGhlIHBhY2thZ2UgKGUuZy4gYEBhbmd1bGFyL2NvcmVgKS4gKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKiogVGhlIHBhdGggdG8gdGhlIHBhY2thZ2UgdGhhdCBjb250YWlucyB0aGlzIGVudHJ5LXBvaW50LiAqL1xuICBwYWNrYWdlOiBzdHJpbmc7XG4gIC8qKiBUaGUgcGF0aCB0byB0aGlzIGVudHJ5IHBvaW50LiAqL1xuICBwYXRoOiBzdHJpbmc7XG4gIC8qKiBUaGUgcGF0aCB0byBhIHR5cGluZ3MgKC5kLnRzKSBmaWxlIGZvciB0aGlzIGVudHJ5LXBvaW50LiAqL1xuICB0eXBpbmdzOiBzdHJpbmc7XG59O1xuXG5pbnRlcmZhY2UgRW50cnlQb2ludFBhY2thZ2VKc29uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBmZXNtMjAxNT86IHN0cmluZztcbiAgZmVzbTU/OiBzdHJpbmc7XG4gIGVzMjAxNT86IHN0cmluZzsgIC8vIGlmIGV4aXN0cyB0aGVuIGl0IGlzIGFjdHVhbGx5IEZFU00yMDE1XG4gIGVzbTIwMTU/OiBzdHJpbmc7XG4gIGVzbTU/OiBzdHJpbmc7XG4gIG1haW4/OiBzdHJpbmc7ICAgICAvLyBVTURcbiAgbW9kdWxlPzogc3RyaW5nOyAgIC8vIGlmIGV4aXN0cyB0aGVuIGl0IGlzIGFjdHVhbGx5IEZFU001XG4gIHR5cGVzPzogc3RyaW5nOyAgICAvLyBTeW5vbnltb3VzIHRvIGB0eXBpbmdzYCBwcm9wZXJ0eSAtIHNlZSBodHRwczovL2JpdC5seS8yT2dXcDJIXG4gIHR5cGluZ3M/OiBzdHJpbmc7ICAvLyBUeXBlU2NyaXB0IC5kLnRzIGZpbGVzXG59XG5cbi8qKlxuICogVHJ5IHRvIGdldCBlbnRyeSBwb2ludCBpbmZvIGZyb20gdGhlIGdpdmVuIHBhdGguXG4gKiBAcGFyYW0gcGtnUGF0aCB0aGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgY29udGFpbmluZyBucG0gcGFja2FnZVxuICogQHBhcmFtIGVudHJ5UG9pbnQgdGhlIGFic29sdXRlIHBhdGggdG8gdGhlIHBvdGVudGlhbCBlbnRyeSBwb2ludC5cbiAqIEByZXR1cm5zIEluZm8gYWJvdXQgdGhlIGVudHJ5IHBvaW50IGlmIGl0IGlzIHZhbGlkLCBgbnVsbGAgb3RoZXJ3aXNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50cnlQb2ludEluZm8ocGtnUGF0aDogc3RyaW5nLCBlbnRyeVBvaW50OiBzdHJpbmcpOiBFbnRyeVBvaW50fG51bGwge1xuICBjb25zdCBwYWNrYWdlSnNvblBhdGggPSBwYXRoLnJlc29sdmUoZW50cnlQb2ludCwgJ3BhY2thZ2UuanNvbicpO1xuICBpZiAoIWZzLmV4aXN0c1N5bmMocGFja2FnZUpzb25QYXRoKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gSWYgdGhlcmUgaXMgYGVzbTIwMTVgIHRoZW4gYGVzMjAxNWAgd2lsbCBiZSBGRVNNMjAxNSwgb3RoZXJ3aXNlIEVTTTIwMTUuXG4gIC8vIElmIHRoZXJlIGlzIGBlc201YCB0aGVuIGBtb2R1bGVgIHdpbGwgYmUgRkVTTTUsIG90aGVyd2lzZSBpdCB3aWxsIGJlIEVTTTUuXG4gIGNvbnN0IHtcbiAgICBuYW1lLFxuICAgIG1vZHVsZTogbW9kdWxlUGF0aCxcbiAgICB0eXBlcyxcbiAgICB0eXBpbmdzID0gdHlwZXMsICAvLyBzeW5vbnltb3VzXG4gICAgZXMyMDE1LFxuICAgIGZlc20yMDE1ID0gZXMyMDE1LCAgIC8vIHN5bm9ueW1vdXNcbiAgICBmZXNtNSA9IG1vZHVsZVBhdGgsICAvLyBzeW5vbnltb3VzXG4gICAgZXNtMjAxNSxcbiAgICBlc201LFxuICAgIG1haW5cbiAgfTogRW50cnlQb2ludFBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGFja2FnZUpzb25QYXRoLCAndXRmOCcpKTtcblxuICAvLyBNaW5pbXVtIHJlcXVpcmVtZW50IGlzIHRoYXQgd2UgaGF2ZSBmZXNtMjAxNSBmb3JtYXQgYW5kIHR5cGluZ3MuXG4gIGlmICghdHlwaW5ncyB8fCAhZmVzbTIwMTUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEFsc28gd2UgbmVlZCB0byBoYXZlIGEgbWV0YWRhdGEuanNvbiBmaWxlXG4gIGNvbnN0IG1ldGFkYXRhUGF0aCA9IHBhdGgucmVzb2x2ZShlbnRyeVBvaW50LCB0eXBpbmdzLnJlcGxhY2UoL1xcLmRcXC50cyQvLCAnJykgKyAnLm1ldGFkYXRhLmpzb24nKTtcbiAgaWYgKCFmcy5leGlzdHNTeW5jKG1ldGFkYXRhUGF0aCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGVudHJ5UG9pbnRJbmZvOiBFbnRyeVBvaW50ID0ge1xuICAgIG5hbWUsXG4gICAgcGFja2FnZTogcGtnUGF0aCxcbiAgICBwYXRoOiBlbnRyeVBvaW50LFxuICAgIHR5cGluZ3M6IHBhdGgucmVzb2x2ZShlbnRyeVBvaW50LCB0eXBpbmdzKSxcbiAgICBmZXNtMjAxNTogcGF0aC5yZXNvbHZlKGVudHJ5UG9pbnQsIGZlc20yMDE1KSxcbiAgfTtcblxuICBpZiAoZXNtMjAxNSkge1xuICAgIGVudHJ5UG9pbnRJbmZvLmVzbTIwMTUgPSBwYXRoLnJlc29sdmUoZW50cnlQb2ludCwgZXNtMjAxNSk7XG4gIH1cbiAgaWYgKGZlc201KSB7XG4gICAgZW50cnlQb2ludEluZm8uZmVzbTUgPSBwYXRoLnJlc29sdmUoZW50cnlQb2ludCwgZmVzbTUpO1xuICB9XG4gIGlmIChlc201KSB7XG4gICAgZW50cnlQb2ludEluZm8uZXNtNSA9IHBhdGgucmVzb2x2ZShlbnRyeVBvaW50LCBlc201KTtcbiAgfVxuICBpZiAobWFpbikge1xuICAgIGVudHJ5UG9pbnRJbmZvLnVtZCA9IHBhdGgucmVzb2x2ZShlbnRyeVBvaW50LCBtYWluKTtcbiAgfVxuXG4gIHJldHVybiBlbnRyeVBvaW50SW5mbztcbn1cbiJdfQ==
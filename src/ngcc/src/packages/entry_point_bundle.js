(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngcc/src/packages/entry_point_bundle", ["require", "exports", "tslib", "canonical-path", "fs", "typescript"], factory);
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
    var canonical_path_1 = require("canonical-path");
    var fs_1 = require("fs");
    var ts = require("typescript");
    /**
     * Get an object that describes a formatted bundle for an entry-point.
     * @param entryPoint The entry-point that contains the bundle.
     * @param format The format of the bundle.
     * @param transformDts Whether this bundle should also include .d.ts files
     */
    function getEntryPointBundle(entryPoint, format, transformDts) {
        var path = entryPoint[format];
        if (!path) {
            return null;
        }
        // Create the TS program and necessary helpers.
        var options = {
            allowJs: true,
            maxNodeModuleJsDepth: Infinity,
            rootDir: entryPoint.path,
        };
        var host = ts.createCompilerHost(options);
        var rootDirs = getRootDirs(host, options);
        // Create the bundle source program
        var r3SymbolsPath = entryPoint.isCore ? findR3SymbolsPath(canonical_path_1.dirname(path), 'r3_symbols.js') : null;
        var rootPaths = r3SymbolsPath ? [path, r3SymbolsPath] : [path];
        var program = ts.createProgram(rootPaths, options, host);
        var file = program.getSourceFile(path);
        // Create the typings program, if necessary
        var dtsPath = transformDts ? entryPoint.typings : null;
        var dtsProgram = transformDts ? ts.createProgram([entryPoint.typings], options, host) : null;
        var dtsFile = dtsProgram && dtsProgram.getSourceFile(dtsPath) || null;
        var r3SymbolsFile = r3SymbolsPath && program.getSourceFile(r3SymbolsPath) || null;
        var isFlat = r3SymbolsFile === null;
        return { entryPoint: entryPoint, format: format, rootDirs: rootDirs, path: path, program: program, file: file,
            r3SymbolsPath: r3SymbolsPath, r3SymbolsFile: r3SymbolsFile, dtsPath: dtsPath, dtsProgram: dtsProgram, dtsFile: dtsFile, isFlat: isFlat };
    }
    exports.getEntryPointBundle = getEntryPointBundle;
    /**
     * Find a an array of paths to the directories that are the roots of the
     * compilation for this compiler host.
     */
    function getRootDirs(host, options) {
        if (options.rootDirs !== undefined) {
            return options.rootDirs;
        }
        else if (options.rootDir !== undefined) {
            return [options.rootDir];
        }
        else {
            return [host.getCurrentDirectory()];
        }
    }
    /**
     * Search the given directory hierarchy to find the path to the `r3_symbols` file.
     */
    function findR3SymbolsPath(directory, filename) {
        var e_1, _a;
        var r3SymbolsFilePath = canonical_path_1.resolve(directory, filename);
        if (fs_1.existsSync(r3SymbolsFilePath)) {
            return r3SymbolsFilePath;
        }
        var subDirectories = fs_1.readdirSync(directory)
            // Not interested in hidden files
            .filter(function (p) { return !p.startsWith('.'); })
            // Ignore node_modules
            .filter(function (p) { return p !== 'node_modules'; })
            // Only interested in directories (and only those that are not symlinks)
            .filter(function (p) {
            var stat = fs_1.lstatSync(canonical_path_1.resolve(directory, p));
            return stat.isDirectory() && !stat.isSymbolicLink();
        });
        try {
            for (var subDirectories_1 = tslib_1.__values(subDirectories), subDirectories_1_1 = subDirectories_1.next(); !subDirectories_1_1.done; subDirectories_1_1 = subDirectories_1.next()) {
                var subDirectory = subDirectories_1_1.value;
                var r3SymbolsFilePath_1 = findR3SymbolsPath(canonical_path_1.resolve(directory, subDirectory), filename);
                if (r3SymbolsFilePath_1) {
                    return r3SymbolsFilePath_1;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (subDirectories_1_1 && !subDirectories_1_1.done && (_a = subDirectories_1.return)) _a.call(subDirectories_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return null;
    }
    exports.findR3SymbolsPath = findR3SymbolsPath;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnlfcG9pbnRfYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXItY2xpL3NyYy9uZ2NjL3NyYy9wYWNrYWdlcy9lbnRyeV9wb2ludF9idW5kbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsaURBQWdEO0lBQ2hELHlCQUFzRDtJQUN0RCwrQkFBaUM7SUF5QmpDOzs7OztPQUtHO0lBQ0gsU0FBZ0IsbUJBQW1CLENBQy9CLFVBQXNCLEVBQUUsTUFBd0IsRUFBRSxZQUFxQjtRQUV6RSxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCwrQ0FBK0M7UUFDL0MsSUFBTSxPQUFPLEdBQXVCO1lBQ2xDLE9BQU8sRUFBRSxJQUFJO1lBQ2Isb0JBQW9CLEVBQUUsUUFBUTtZQUM5QixPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUk7U0FDekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLG1DQUFtQztRQUNuQyxJQUFNLGFBQWEsR0FDZixVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFakYsSUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxJQUFN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QVEsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLG1CQUFpQixFQUFFO29CQUNyQixPQUFPLG1CQUFpQixDQUFDO2lCQUMxQjthQUNGOzs7Ozs7Ozs7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUExQkQsOENBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtkaXJuYW1lLCByZXNvbHZlfSBmcm9tICdjYW5vbmljYWwtcGF0aCc7XG5pbXBvcnQge2V4aXN0c1N5bmMsIGxzdGF0U3luYywgcmVhZGRpclN5bmN9IGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHtFbnRyeVBvaW50LCBFbnRyeVBvaW50Rm9ybWF0fSBmcm9tICcuL2VudHJ5X3BvaW50JztcblxuLyoqXG4gKiBBIGJ1bmRsZSBvZiBmaWxlcyBhbmQgcGF0aHMgKGFuZCBUUyBwcm9ncmFtcykgdGhhdCBjb3JyZXNwb25kIHRvIGEgcGFydGljdWxhclxuICogZm9ybWF0IG9mIGEgcGFja2FnZSBlbnRyeS1wb2ludC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbnRyeVBvaW50QnVuZGxlIHtcbiAgZW50cnlQb2ludDogRW50cnlQb2ludDtcbiAgZm9ybWF0OiBFbnRyeVBvaW50Rm9ybWF0O1xuICBpc0ZsYXQ6IGJvb2xlYW47XG4gIHJvb3REaXJzOiBzdHJpbmdbXTtcblxuICBwYXRoOiBzdHJpbmc7XG4gIHByb2dyYW06IHRzLlByb2dyYW07XG4gIGZpbGU6IHRzLlNvdXJjZUZpbGU7XG5cbiAgcjNTeW1ib2xzUGF0aDogc3RyaW5nfG51bGw7XG4gIHIzU3ltYm9sc0ZpbGU6IHRzLlNvdXJjZUZpbGV8bnVsbDtcblxuICBkdHNQYXRoOiBzdHJpbmd8bnVsbDtcbiAgZHRzUHJvZ3JhbTogdHMuUHJvZ3JhbXxudWxsO1xuICBkdHNGaWxlOiB0cy5Tb3VyY2VGaWxlfG51bGw7XG59XG5cbi8qKlxuICogR2V0IGFuIG9iamVjdCB0aGF0IGRlc2NyaWJlcyBhIGZvcm1hdHRlZCBidW5kbGUgZm9yIGFuIGVudHJ5LXBvaW50LlxuICogQHBhcmFtIGVudHJ5UG9pbnQgVGhlIGVudHJ5LXBvaW50IHRoYXQgY29udGFpbnMgdGhlIGJ1bmRsZS5cbiAqIEBwYXJhbSBmb3JtYXQgVGhlIGZvcm1hdCBvZiB0aGUgYnVuZGxlLlxuICogQHBhcmFtIHRyYW5zZm9ybUR0cyBXaGV0aGVyIHRoaXMgYnVuZGxlIHNob3VsZCBhbHNvIGluY2x1ZGUgLmQudHMgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudHJ5UG9pbnRCdW5kbGUoXG4gICAgZW50cnlQb2ludDogRW50cnlQb2ludCwgZm9ybWF0OiBFbnRyeVBvaW50Rm9ybWF0LCB0cmFuc2Zvcm1EdHM6IGJvb2xlYW4pOiBFbnRyeVBvaW50QnVuZGxlfFxuICAgIG51bGwge1xuICBjb25zdCBwYXRoID0gZW50cnlQb2ludFtmb3JtYXRdO1xuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIENyZWF0ZSB0aGUgVFMgcHJvZ3JhbSBhbmQgbmVjZXNzYXJ5IGhlbHBlcnMuXG4gIGNvbnN0IG9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucyA9IHtcbiAgICBhbGxvd0pzOiB0cnVlLFxuICAgIG1heE5vZGVNb2R1bGVKc0RlcHRoOiBJbmZpbml0eSxcbiAgICByb290RGlyOiBlbnRyeVBvaW50LnBhdGgsXG4gIH07XG4gIGNvbnN0IGhvc3QgPSB0cy5jcmVhdGVDb21waWxlckhvc3Qob3B0aW9ucyk7XG4gIGNvbnN0IHJvb3REaXJzID0gZ2V0Um9vdERpcnMoaG9zdCwgb3B0aW9ucyk7XG5cbiAgLy8gQ3JlYXRlIHRoZSBidW5kbGUgc291cmNlIHByb2dyYW1cbiAgY29uc3QgcjNTeW1ib2xzUGF0aCA9XG4gICAgICBlbnRyeVBvaW50LmlzQ29yZSA/IGZpbmRSM1N5bWJvbHNQYXRoKGRpcm5hbWUocGF0aCksICdyM19zeW1ib2xzLmpzJykgOiBudWxsO1xuXG4gIGNvbnN0IHJvb3RQYXRocyA9IHIzU3ltYm9sc1BhdGggPyBbcGF0aCwgcjNTeW1ib2xzUGF0aF0gOiBbcGF0aF07XG4gIGNvbnN0IHByb2dyYW0gPSB0cy5jcmVhdGVQcm9ncmFtKHJvb3RQYXRocywgb3B0aW9ucywgaG9zdCk7XG4gIGNvbnN0IGZpbGUgPSBwcm9ncmFtLmdldFNvdXJjZUZpbGUocGF0aCkgITtcblxuICAvLyBDcmVhdGUgdGhlIHR5cGluZ3MgcHJvZ3JhbSwgaWYgbmVjZXNzYXJ5XG4gIGNvbnN0IGR0c1BhdGggPSB0cmFuc2Zvcm1EdHMgPyBlbnRyeVBvaW50LnR5cGluZ3MgOiBudWxsO1xuICBjb25zdCBkdHNQcm9ncmFtID0gdHJhbnNmb3JtRHRzID8gdHMuY3JlYXRlUHJvZ3JhbShbZW50cnlQb2ludC50eXBpbmdzXSwgb3B0aW9ucywgaG9zdCkgOiBudWxsO1xuICBjb25zdCBkdHNGaWxlID0gZHRzUHJvZ3JhbSAmJiBkdHNQcm9ncmFtLmdldFNvdXJjZUZpbGUoZHRzUGF0aCAhKSB8fCBudWxsO1xuXG4gIGNvbnN0IHIzU3ltYm9sc0ZpbGUgPSByM1N5bWJvbHNQYXRoICYmIHByb2dyYW0uZ2V0U291cmNlRmlsZShyM1N5bWJvbHNQYXRoKSB8fCBudWxsO1xuICBjb25zdCBpc0ZsYXQgPSByM1N5bWJvbHNGaWxlID09PSBudWxsO1xuXG4gIHJldHVybiB7ZW50cnlQb2ludCwgICAgZm9ybWF0LCAgICAgICAgcm9vdERpcnMsIHBhdGgsICAgICAgIHByb2dyYW0sIGZpbGUsXG4gICAgICAgICAgcjNTeW1ib2xzUGF0aCwgcjNTeW1ib2xzRmlsZSwgZHRzUGF0aCwgIGR0c1Byb2dyYW0sIGR0c0ZpbGUsIGlzRmxhdH07XG59XG5cbi8qKlxuICogRmluZCBhIGFuIGFycmF5IG9mIHBhdGhzIHRvIHRoZSBkaXJlY3RvcmllcyB0aGF0IGFyZSB0aGUgcm9vdHMgb2YgdGhlXG4gKiBjb21waWxhdGlvbiBmb3IgdGhpcyBjb21waWxlciBob3N0LlxuICovXG5mdW5jdGlvbiBnZXRSb290RGlycyhob3N0OiB0cy5Db21waWxlckhvc3QsIG9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucyk6IHN0cmluZ1tdIHtcbiAgaWYgKG9wdGlvbnMucm9vdERpcnMgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBvcHRpb25zLnJvb3REaXJzO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMucm9vdERpciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIFtvcHRpb25zLnJvb3REaXJdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbaG9zdC5nZXRDdXJyZW50RGlyZWN0b3J5KCldO1xuICB9XG59XG5cbi8qKlxuICogU2VhcmNoIHRoZSBnaXZlbiBkaXJlY3RvcnkgaGllcmFyY2h5IHRvIGZpbmQgdGhlIHBhdGggdG8gdGhlIGByM19zeW1ib2xzYCBmaWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZFIzU3ltYm9sc1BhdGgoZGlyZWN0b3J5OiBzdHJpbmcsIGZpbGVuYW1lOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IHIzU3ltYm9sc0ZpbGVQYXRoID0gcmVzb2x2ZShkaXJlY3RvcnksIGZpbGVuYW1lKTtcbiAgaWYgKGV4aXN0c1N5bmMocjNTeW1ib2xzRmlsZVBhdGgpKSB7XG4gICAgcmV0dXJuIHIzU3ltYm9sc0ZpbGVQYXRoO1xuICB9XG5cbiAgY29uc3Qgc3ViRGlyZWN0b3JpZXMgPVxuICAgICAgcmVhZGRpclN5bmMoZGlyZWN0b3J5KVxuICAgICAgICAgIC8vIE5vdCBpbnRlcmVzdGVkIGluIGhpZGRlbiBmaWxlc1xuICAgICAgICAgIC5maWx0ZXIocCA9PiAhcC5zdGFydHNXaXRoKCcuJykpXG4gICAgICAgICAgLy8gSWdub3JlIG5vZGVfbW9kdWxlc1xuICAgICAgICAgIC5maWx0ZXIocCA9PiBwICE9PSAnbm9kZV9tb2R1bGVzJylcbiAgICAgICAgICAvLyBPbmx5IGludGVyZXN0ZWQgaW4gZGlyZWN0b3JpZXMgKGFuZCBvbmx5IHRob3NlIHRoYXQgYXJlIG5vdCBzeW1saW5rcylcbiAgICAgICAgICAuZmlsdGVyKHAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RhdCA9IGxzdGF0U3luYyhyZXNvbHZlKGRpcmVjdG9yeSwgcCkpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXQuaXNEaXJlY3RvcnkoKSAmJiAhc3RhdC5pc1N5bWJvbGljTGluaygpO1xuICAgICAgICAgIH0pO1xuXG4gIGZvciAoY29uc3Qgc3ViRGlyZWN0b3J5IG9mIHN1YkRpcmVjdG9yaWVzKSB7XG4gICAgY29uc3QgcjNTeW1ib2xzRmlsZVBhdGggPSBmaW5kUjNTeW1ib2xzUGF0aChyZXNvbHZlKGRpcmVjdG9yeSwgc3ViRGlyZWN0b3J5LCApLCBmaWxlbmFtZSk7XG4gICAgaWYgKHIzU3ltYm9sc0ZpbGVQYXRoKSB7XG4gICAgICByZXR1cm4gcjNTeW1ib2xzRmlsZVBhdGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iXX0=
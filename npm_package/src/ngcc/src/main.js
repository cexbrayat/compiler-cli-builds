(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/compiler-cli/src/ngcc/src/main", ["require", "exports", "canonical-path", "yargs", "@angular/compiler-cli/src/ngcc/src/packages/dependency_host", "@angular/compiler-cli/src/ngcc/src/packages/dependency_resolver", "@angular/compiler-cli/src/ngcc/src/packages/entry_point_bundle", "@angular/compiler-cli/src/ngcc/src/packages/entry_point_finder", "@angular/compiler-cli/src/ngcc/src/packages/transformer"], factory);
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
    var path = require("canonical-path");
    var yargs = require("yargs");
    var dependency_host_1 = require("@angular/compiler-cli/src/ngcc/src/packages/dependency_host");
    var dependency_resolver_1 = require("@angular/compiler-cli/src/ngcc/src/packages/dependency_resolver");
    var entry_point_bundle_1 = require("@angular/compiler-cli/src/ngcc/src/packages/entry_point_bundle");
    var entry_point_finder_1 = require("@angular/compiler-cli/src/ngcc/src/packages/entry_point_finder");
    var transformer_1 = require("@angular/compiler-cli/src/ngcc/src/packages/transformer");
    function mainNgcc(args) {
        var options = yargs
            .option('s', {
            alias: 'source',
            describe: 'A path to the root folder to compile.',
            default: './node_modules'
        })
            .option('f', {
            alias: 'formats',
            array: true,
            describe: 'An array of formats to compile.',
            default: ['fesm2015', 'esm2015', 'fesm5', 'esm5']
        })
            .option('t', {
            alias: 'target',
            describe: 'A path to a root folder where the compiled files will be written.',
            defaultDescription: 'The `source` folder.'
        })
            .help()
            .parse(args);
        var sourcePath = path.resolve(options['s']);
        var formats = options['f'];
        var targetPath = options['t'] || sourcePath;
        var transformer = new transformer_1.Transformer(sourcePath, targetPath);
        var host = new dependency_host_1.DependencyHost();
        var resolver = new dependency_resolver_1.DependencyResolver(host);
        var finder = new entry_point_finder_1.EntryPointFinder(resolver);
        try {
            var entryPoints = finder.findEntryPoints(sourcePath).entryPoints;
            entryPoints.forEach(function (entryPoint) {
                // We transform the d.ts typings files while transforming one of the formats.
                // This variable decides with which of the available formats to do this transform.
                // It is marginally faster to process via the flat file if available.
                var dtsTransformFormat = entryPoint.fesm2015 ? 'fesm2015' : 'esm2015';
                formats.forEach(function (format) {
                    var bundle = entry_point_bundle_1.getEntryPointBundle(entryPoint, format, format === dtsTransformFormat);
                    if (bundle === null) {
                        console.warn("Skipping " + entryPoint.name + " : " + format + " (no entry point file for this format).");
                    }
                    else {
                        transformer.transform(bundle);
                    }
                });
            });
        }
        catch (e) {
            console.error(e.stack);
            return 1;
        }
        return 0;
    }
    exports.mainNgcc = mainNgcc;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyLWNsaS9zcmMvbmdjYy9zcmMvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBOzs7Ozs7T0FNRztJQUNILHFDQUF1QztJQUN2Qyw2QkFBK0I7SUFFL0IsK0ZBQTBEO0lBQzFELHVHQUFrRTtJQUVsRSxxR0FBa0U7SUFDbEUscUdBQStEO0lBQy9ELHVGQUFtRDtJQUVuRCxTQUFnQixRQUFRLENBQUMsSUFBYztRQUNyQyxJQUFNLE9BQU8sR0FDVCxLQUFLO2FBQ0EsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLHVDQUF1QztZQUNqRCxPQUFPLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUM7YUFDRCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1gsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLElBQUk7WUFDWCxRQUFRLEVBQUUsaUNBQWlDO1lBQzNDLE9BQU8sRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztTQUNsRCxDQUFDO2FBQ0QsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNYLEtBQUssRUFBRSxRQUFRO1lBQ2YsUUFBUSxFQUFFLG1FQUFtRTtZQUM3RSxrQkFBa0IsRUFBRSxzQkFBc0I7U0FDM0MsQ0FBQzthQUNELElBQUksRUFBRTthQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVyQixJQUFNLFVBQVUsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQU0sT0FBTyxHQUF1QixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBTSxVQUFVLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFVBQVUsQ0FBQztRQUV0RCxJQUFNLFdBQVcsR0FBRyxJQUFJLHlCQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVELElBQU0sSUFBSSxHQUFHLElBQUksZ0NBQWMsRUFBRSxDQUFDO1FBQ2xDLElBQU0sUUFBUSxHQUFHLElBQUksd0NBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQ0FBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUU5QyxJQUFJO1lBQ0ssSUFBQSw0REFBVyxDQUF1QztZQUN6RCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVTtnQkFDNUIsNkVBQTZFO2dCQUM3RSxrRkFBa0Y7Z0JBQ2xGLHFFQUFxRTtnQkFDckUsSUFBTSxrQkFBa0IsR0FBcUIsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBRTFGLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUNwQixJQUFNLE1BQU0sR0FBRyx3Q0FBbUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sS0FBSyxrQkFBa0IsQ0FBQyxDQUFDO29CQUN0RixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7d0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQ1IsY0FBWSxVQUFVLENBQUMsSUFBSSxXQUFNLE1BQU0sNENBQXlDLENBQUMsQ0FBQztxQkFDdkY7eUJBQU07d0JBQ0wsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDL0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsQ0FBQztTQUNWO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBdkRELDRCQXVEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnY2Fub25pY2FsLXBhdGgnO1xuaW1wb3J0ICogYXMgeWFyZ3MgZnJvbSAneWFyZ3MnO1xuXG5pbXBvcnQge0RlcGVuZGVuY3lIb3N0fSBmcm9tICcuL3BhY2thZ2VzL2RlcGVuZGVuY3lfaG9zdCc7XG5pbXBvcnQge0RlcGVuZGVuY3lSZXNvbHZlcn0gZnJvbSAnLi9wYWNrYWdlcy9kZXBlbmRlbmN5X3Jlc29sdmVyJztcbmltcG9ydCB7RW50cnlQb2ludEZvcm1hdH0gZnJvbSAnLi9wYWNrYWdlcy9lbnRyeV9wb2ludCc7XG5pbXBvcnQge2dldEVudHJ5UG9pbnRCdW5kbGV9IGZyb20gJy4vcGFja2FnZXMvZW50cnlfcG9pbnRfYnVuZGxlJztcbmltcG9ydCB7RW50cnlQb2ludEZpbmRlcn0gZnJvbSAnLi9wYWNrYWdlcy9lbnRyeV9wb2ludF9maW5kZXInO1xuaW1wb3J0IHtUcmFuc2Zvcm1lcn0gZnJvbSAnLi9wYWNrYWdlcy90cmFuc2Zvcm1lcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWluTmdjYyhhcmdzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIGNvbnN0IG9wdGlvbnMgPVxuICAgICAgeWFyZ3NcbiAgICAgICAgICAub3B0aW9uKCdzJywge1xuICAgICAgICAgICAgYWxpYXM6ICdzb3VyY2UnLFxuICAgICAgICAgICAgZGVzY3JpYmU6ICdBIHBhdGggdG8gdGhlIHJvb3QgZm9sZGVyIHRvIGNvbXBpbGUuJyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcuL25vZGVfbW9kdWxlcydcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5vcHRpb24oJ2YnLCB7XG4gICAgICAgICAgICBhbGlhczogJ2Zvcm1hdHMnLFxuICAgICAgICAgICAgYXJyYXk6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmliZTogJ0FuIGFycmF5IG9mIGZvcm1hdHMgdG8gY29tcGlsZS4nLFxuICAgICAgICAgICAgZGVmYXVsdDogWydmZXNtMjAxNScsICdlc20yMDE1JywgJ2Zlc201JywgJ2VzbTUnXVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLm9wdGlvbigndCcsIHtcbiAgICAgICAgICAgIGFsaWFzOiAndGFyZ2V0JyxcbiAgICAgICAgICAgIGRlc2NyaWJlOiAnQSBwYXRoIHRvIGEgcm9vdCBmb2xkZXIgd2hlcmUgdGhlIGNvbXBpbGVkIGZpbGVzIHdpbGwgYmUgd3JpdHRlbi4nLFxuICAgICAgICAgICAgZGVmYXVsdERlc2NyaXB0aW9uOiAnVGhlIGBzb3VyY2VgIGZvbGRlci4nXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuaGVscCgpXG4gICAgICAgICAgLnBhcnNlKGFyZ3MpO1xuXG4gIGNvbnN0IHNvdXJjZVBhdGg6IHN0cmluZyA9IHBhdGgucmVzb2x2ZShvcHRpb25zWydzJ10pO1xuICBjb25zdCBmb3JtYXRzOiBFbnRyeVBvaW50Rm9ybWF0W10gPSBvcHRpb25zWydmJ107XG4gIGNvbnN0IHRhcmdldFBhdGg6IHN0cmluZyA9IG9wdGlvbnNbJ3QnXSB8fCBzb3VyY2VQYXRoO1xuXG4gIGNvbnN0IHRyYW5zZm9ybWVyID0gbmV3IFRyYW5zZm9ybWVyKHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICBjb25zdCBob3N0ID0gbmV3IERlcGVuZGVuY3lIb3N0KCk7XG4gIGNvbnN0IHJlc29sdmVyID0gbmV3IERlcGVuZGVuY3lSZXNvbHZlcihob3N0KTtcbiAgY29uc3QgZmluZGVyID0gbmV3IEVudHJ5UG9pbnRGaW5kZXIocmVzb2x2ZXIpO1xuXG4gIHRyeSB7XG4gICAgY29uc3Qge2VudHJ5UG9pbnRzfSA9IGZpbmRlci5maW5kRW50cnlQb2ludHMoc291cmNlUGF0aCk7XG4gICAgZW50cnlQb2ludHMuZm9yRWFjaChlbnRyeVBvaW50ID0+IHtcbiAgICAgIC8vIFdlIHRyYW5zZm9ybSB0aGUgZC50cyB0eXBpbmdzIGZpbGVzIHdoaWxlIHRyYW5zZm9ybWluZyBvbmUgb2YgdGhlIGZvcm1hdHMuXG4gICAgICAvLyBUaGlzIHZhcmlhYmxlIGRlY2lkZXMgd2l0aCB3aGljaCBvZiB0aGUgYXZhaWxhYmxlIGZvcm1hdHMgdG8gZG8gdGhpcyB0cmFuc2Zvcm0uXG4gICAgICAvLyBJdCBpcyBtYXJnaW5hbGx5IGZhc3RlciB0byBwcm9jZXNzIHZpYSB0aGUgZmxhdCBmaWxlIGlmIGF2YWlsYWJsZS5cbiAgICAgIGNvbnN0IGR0c1RyYW5zZm9ybUZvcm1hdDogRW50cnlQb2ludEZvcm1hdCA9IGVudHJ5UG9pbnQuZmVzbTIwMTUgPyAnZmVzbTIwMTUnIDogJ2VzbTIwMTUnO1xuXG4gICAgICBmb3JtYXRzLmZvckVhY2goZm9ybWF0ID0+IHtcbiAgICAgICAgY29uc3QgYnVuZGxlID0gZ2V0RW50cnlQb2ludEJ1bmRsZShlbnRyeVBvaW50LCBmb3JtYXQsIGZvcm1hdCA9PT0gZHRzVHJhbnNmb3JtRm9ybWF0KTtcbiAgICAgICAgaWYgKGJ1bmRsZSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYFNraXBwaW5nICR7ZW50cnlQb2ludC5uYW1lfSA6ICR7Zm9ybWF0fSAobm8gZW50cnkgcG9pbnQgZmlsZSBmb3IgdGhpcyBmb3JtYXQpLmApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRyYW5zZm9ybWVyLnRyYW5zZm9ybShidW5kbGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoZS5zdGFjayk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICByZXR1cm4gMDtcbn1cbiJdfQ==
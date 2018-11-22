/// <amd-module name="@angular/compiler-cli/src/ngcc/src/packages/entry_point_bundle" />
import * as ts from 'typescript';
import { EntryPoint, EntryPointFormat } from './entry_point';
/**
 * A bundle of files and paths (and TS programs) that correspond to a particular
 * format of a package entry-point.
 */
export interface EntryPointBundle {
    entryPoint: EntryPoint;
    format: EntryPointFormat;
    isFlat: boolean;
    rootDirs: string[];
    path: string;
    program: ts.Program;
    file: ts.SourceFile;
    r3SymbolsPath: string | null;
    r3SymbolsFile: ts.SourceFile | null;
    dtsPath: string | null;
    dtsProgram: ts.Program | null;
    dtsFile: ts.SourceFile | null;
}
/**
 * Get an object that describes a formatted bundle for an entry-point.
 * @param entryPoint The entry-point that contains the bundle.
 * @param format The format of the bundle.
 * @param transformDts Whether this bundle should also include .d.ts files
 */
export declare function getEntryPointBundle(entryPoint: EntryPoint, format: EntryPointFormat, transformDts: boolean): EntryPointBundle | null;
/**
 * Search the given directory hierarchy to find the path to the `r3_symbols` file.
 */
export declare function findR3SymbolsPath(directory: string, filename: string): string | null;

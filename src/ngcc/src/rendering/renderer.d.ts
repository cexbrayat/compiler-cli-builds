/// <amd-module name="@angular/compiler-cli/src/ngcc/src/rendering/renderer" />
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ConstantPool } from '@angular/compiler';
import { SourceMapConverter } from 'convert-source-map';
import MagicString from 'magic-string';
import { RawSourceMap } from 'source-map';
import * as ts from 'typescript';
import { Decorator } from '../../../ngtsc/host';
import { CompileResult } from '@angular/compiler-cli/src/ngtsc/transform';
import { NgccImportManager } from './ngcc_import_manager';
import { CompiledClass, CompiledFile, DecorationAnalyses } from '../analysis/decoration_analyzer';
import { PrivateDeclarationsAnalyses, ExportInfo } from '../analysis/private_declarations_analyzer';
import { SwitchMarkerAnalyses, SwitchMarkerAnalysis } from '../analysis/switch_marker_analyzer';
import { NgccReflectionHost, SwitchableVariableDeclaration } from '../host/ngcc_host';
import { EntryPointBundle } from '../packages/entry_point_bundle';
interface SourceMapInfo {
    source: string;
    map: SourceMapConverter | null;
    isInline: boolean;
}
/**
 * Information about a file that has been rendered.
 */
export interface FileInfo {
    /**
     * Path to where the file should be written.
     */
    path: string;
    /**
     * The contents of the file to be be written.
     */
    contents: string;
}
interface DtsClassInfo {
    dtsDeclaration: ts.Declaration;
    compilation: CompileResult[];
}
/**
 * A base-class for rendering an `AnalyzedFile`.
 *
 * Package formats have output files that must be rendered differently. Concrete sub-classes must
 * implement the `addImports`, `addDefinitions` and `removeDecorators` abstract methods.
 */
export declare abstract class Renderer {
    protected host: NgccReflectionHost;
    protected bundle: EntryPointBundle;
    protected sourcePath: string;
    protected targetPath: string;
    constructor(host: NgccReflectionHost, bundle: EntryPointBundle, sourcePath: string, targetPath: string);
    renderProgram(decorationAnalyses: DecorationAnalyses, switchMarkerAnalyses: SwitchMarkerAnalyses, privateDeclarationsAnalyses: PrivateDeclarationsAnalyses): FileInfo[];
    /**
     * Render the source code and source-map for an Analyzed file.
     * @param compiledFile The analyzed file to render.
     * @param targetPath The absolute path where the rendered file will be written.
     */
    renderFile(sourceFile: ts.SourceFile, compiledFile: CompiledFile | undefined, switchMarkerAnalysis: SwitchMarkerAnalysis | undefined, privateDeclarationsAnalyses: PrivateDeclarationsAnalyses): FileInfo[];
    renderDtsFile(dtsFile: ts.SourceFile, dtsClasses: DtsClassInfo[], privateDeclarationsAnalyses: PrivateDeclarationsAnalyses): FileInfo[];
    protected abstract addConstants(output: MagicString, constants: string, file: ts.SourceFile): void;
    protected abstract addImports(output: MagicString, imports: {
        name: string;
        as: string;
    }[]): void;
    protected abstract addExports(output: MagicString, entryPointBasePath: string, exports: ExportInfo[], useDts: boolean): void;
    protected abstract addDefinitions(output: MagicString, compiledClass: CompiledClass, definitions: string): void;
    protected abstract removeDecorators(output: MagicString, decoratorsToRemove: Map<ts.Node, ts.Node[]>): void;
    protected abstract rewriteSwitchableDeclarations(outputText: MagicString, sourceFile: ts.SourceFile, declarations: SwitchableVariableDeclaration[]): void;
    /**
     * Add the decorator nodes that are to be removed to a map
     * So that we can tell if we should remove the entire decorator property
     */
    protected trackDecorators(decorators: Decorator[], decoratorsToRemove: Map<ts.Node, ts.Node[]>): void;
    /**
     * Get the map from the source (note whether it is inline or external)
     */
    protected extractSourceMap(file: ts.SourceFile): SourceMapInfo;
    /**
     * Merge the input and output source-maps, replacing the source-map comment in the output file
     * with an appropriate source-map comment pointing to the merged source-map.
     */
    protected renderSourceAndMap(sourceFile: ts.SourceFile, input: SourceMapInfo, output: MagicString): FileInfo[];
    protected getTypingsFilesToRender(analyses: DecorationAnalyses): Map<ts.SourceFile, DtsClassInfo[]>;
}
/**
 * Merge the two specified source-maps into a single source-map that hides the intermediate
 * source-map.
 * E.g. Consider these mappings:
 *
 * ```
 * OLD_SRC -> OLD_MAP -> INTERMEDIATE_SRC -> NEW_MAP -> NEW_SRC
 * ```
 *
 * this will be replaced with:
 *
 * ```
 * OLD_SRC -> MERGED_MAP -> NEW_SRC
 * ```
 */
export declare function mergeSourceMaps(oldMap: RawSourceMap | null, newMap: RawSourceMap): SourceMapConverter;
/**
 * Render the constant pool as source code for the given class.
 */
export declare function renderConstantPool(sourceFile: ts.SourceFile, constantPool: ConstantPool, imports: NgccImportManager): string;
/**
 * Render the definitions as source code for the given class.
 * @param sourceFile The file containing the class to process.
 * @param clazz The class whose definitions are to be rendered.
 * @param compilation The results of analyzing the class - this is used to generate the rendered
 * definitions.
 * @param imports An object that tracks the imports that are needed by the rendered definitions.
 */
export declare function renderDefinitions(sourceFile: ts.SourceFile, compiledClass: CompiledClass, imports: NgccImportManager): string;
export declare function stripExtension(filePath: string): string;
export {};

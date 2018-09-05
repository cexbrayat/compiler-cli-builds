"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var compilation_1 = require("./src/compilation");
exports.IvyCompilation = compilation_1.IvyCompilation;
var declaration_1 = require("./src/declaration");
exports.DtsFileTransformer = declaration_1.DtsFileTransformer;
var transform_1 = require("./src/transform");
exports.ivyTransformFactory = transform_1.ivyTransformFactory;
var translator_1 = require("./src/translator");
exports.ImportManager = translator_1.ImportManager;
exports.translateStatement = translator_1.translateStatement;
//# sourceMappingURL=index.js.map
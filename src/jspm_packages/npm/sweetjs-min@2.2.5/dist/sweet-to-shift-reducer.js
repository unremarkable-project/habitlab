'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _sweetSpec=require('sweet-spec'),S=_interopRequireWildcard(_sweetSpec),_immutable=require('immutable');function _interopRequireWildcard(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}exports.default=class extends S.default.CloneReducer{constructor(a){super(),this.phase=a}reduceModule(a,b){return new S.Module({directives:b.directives.toArray(),items:b.items.toArray()})}reduceIdentifierExpression(a,b){return new S.IdentifierExpression({name:b.name.resolve(this.phase)})}reduceStaticPropertyName(a,b){return new S.StaticPropertyName({value:b.value.val().toString()})}reduceBindingIdentifier(a,b){return new S.BindingIdentifier({name:b.name.resolve(this.phase)})}reduceStaticMemberExpression(a,b){return new S.StaticMemberExpression({object:b.object,property:b.property.val()})}reduceFunctionBody(a,b){return new S.FunctionBody({directives:b.directives.toArray(),statements:b.statements.toArray()})}reduceVariableDeclarationStatement(a,b){return'syntax'===a.declaration.kind||'syntaxrec'===a.declaration.kind?new S.EmptyStatement:new S.VariableDeclarationStatement({declaration:b.declaration})}reduceVariableDeclaration(a,b){return new S.VariableDeclaration({kind:b.kind,declarators:b.declarators.toArray()})}reduceCallExpression(a,b){return new S.CallExpression({callee:b.callee,arguments:b.arguments.toArray()})}reduceArrayExpression(a,b){return new S.ArrayExpression({elements:b.elements.toArray()})}reduceImport(){return new S.EmptyStatement({})}reduceBlock(a,b){return new S.Block({statements:b.statements.toArray()})}};


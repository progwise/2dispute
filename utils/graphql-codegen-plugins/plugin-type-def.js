/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const {
  isSpecifiedScalarType,
  print,
  isSpecifiedDirective,
} = require('graphql');

// The printSchema function from the graphql module ignores custom directives.
// source: https://github.com/graphql/graphql-js/issues/869#issuecomment-374351118
const printSchemaWithDirectives = schema => {
  const directivesStr = schema
    .getDirectives()
    .filter(directive => !isSpecifiedDirective(directive))
    .map(directive => print(directive.astNode))
    .join('\n\n');

  const typeStr = Object.keys(schema.getTypeMap())
    .filter(typeName => !typeName.match(/^__/))
    .filter(typeName => !isSpecifiedScalarType(typeName))
    .map(typeName => print(schema.getType(typeName).astNode))
    .filter(typeStr => !!typeStr)
    .join(`\n\n`);

  return directivesStr + '\n\n' + typeStr + `\n`;
};

module.exports = {
  plugin: schema => {
    const typeDefs = printSchemaWithDirectives(schema);
    return `\nexport const typeDefs = \`\n${typeDefs}\``;
  },
};

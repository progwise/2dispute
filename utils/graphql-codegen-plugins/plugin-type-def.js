/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const { printSchema } = require('graphql');

module.exports = {
  plugin: schema => {
    const typeDefs = printSchema(schema);
    return `\nexport const typeDefs = \`\n${typeDefs}\``;
  },
};

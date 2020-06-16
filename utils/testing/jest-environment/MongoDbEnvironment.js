/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

// From https://itnext.io/parallel-testing-a-graphql-server-with-jest-44e206f3e7d2

const NodeEnvironment = require('jest-environment-node');
const { MongoMemoryServer } = require('mongodb-memory-server');

class MongoDbEnvironment extends NodeEnvironment {
  mongodb;

  constructor(config) {
    super(config);

    this.mongodb = new MongoMemoryServer({
      instance: {},
      binary: {
        skipMD5: true,
      },
      autoStart: false,
    });
  }

  async setup() {
    await super.setup();

    this.global.MONGODB_CONNECTION_STRING = await this.mongodb.getConnectionString();
    // this is used to have different names for documents created while testing
    this.global.__COUNTERS__ = {
      user: 0,
    };
  }

  async teardown() {
    await super.teardown();
    await this.mongodb.stop();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;

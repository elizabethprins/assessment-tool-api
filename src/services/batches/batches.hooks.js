

const joinBatch = require('../../hooks/join-batch');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [joinBatch()],
    patch: [joinBatch()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

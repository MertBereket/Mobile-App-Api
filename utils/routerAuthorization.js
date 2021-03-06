const Roles = require("../models/roles");

module.exports = {
  user: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
  },
  masalar: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
  },
  menu: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator],
    },
  },
  siparis: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
  },
  category: {
    GET: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    DELETE: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    PUT: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    POST: {
      Authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
  },
};

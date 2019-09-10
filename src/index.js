const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of first graph-ql-project tutorial`,
    feed: () => links,
    link: (parent, args) => links[args.id]
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let newLinks = [
        ...links.slice(0, args.id),
        {
          ...links[args.id],
          description: args.description
            ? args.description
            : links[args.id].description,
          url: args.url ? args.url : links[args.id].url
        },
        ...links.slice(args.id + 1)
      ];
      links = newLinks;
      return links[args.id];
    },
    deleteLink: (parent, args) => {
      let elementRemove = links[args.id];
      links.splice(args.id, 1);
      return elementRemove;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

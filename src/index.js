const { ApolloServer, gql } = require('apollo-server')

// Toda request é POST
// Toda request bate no MESMO endpoint (/graphql)

// Query -> Obter informações (GET)
// Mutation -> Manipular dados (POST/PUT/PATCH/DELETE)
// Scaler Types -> String, Int, Boolean, Float e ID

// Types -> Eles são as entidades da nossa aplicação.

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        hello: String
        users: [User]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!) User!
    }
`;

const users = [
    { _id: String(Math.random()), name: 'Leandro', email: 'leandro@leandro.com', active: true },
    { _id: String(Math.random()), name: 'Paulo', email: 'paulo@paulo.com', active: true },
    { _id: String(Math.random()), name: 'Fernando', email: 'fernando@fernando.com', active: true },
]

const resolvers = {
    Query: {
        hello: () => 'Hellou world',
        users: () => users,
        getUserByEmail: (_, { email }) => {
            return users.find(user => user.email === email)
        }
    },
    Mutation: {
        createUser: (_, { name, email }) => {
            const newUser = {
                _id: String(Math.random()),
                name,
                email,
                active: true
            }

            users.push(newUser)

            return newUser
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => console.log(`Server started at ${url}`))
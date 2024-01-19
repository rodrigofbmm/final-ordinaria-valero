// The GraphQL schema
export const typeDefs = `#graphql
  type Contacto{
    id: ID!
    nombre: String!
    telefono: String!
    pais: String
    hora: String
  }

  type Query {
    getContact(id: ID!): Contacto!
    getContacts:[Contacto!]!
  }
  type Mutation {
    addContact(nombre: String!,telefono: String!): Contacto!
    deleteContact(id:ID!): Contacto!
    updateContact(id: ID!, nombre: String!, telefono: String!): Contacto!
  }
`;
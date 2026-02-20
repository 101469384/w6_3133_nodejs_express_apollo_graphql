import { gql } from "graphql-tag";

const movieSchema = gql`
  type Movie {
    id: ID!
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
    movie_age: Int
    summary: String
  }

  input AddMovieInput {
    name: String!
    director_name: String!
    production_house: String!
    release_date: String!
    rating: Float!
  }

  input UpdateMovieInput {
    name: String
    director_name: String
    production_house: String
    release_date: String
    rating: Float
  }

  type Query {
    getAllMovies: [Movie!]!
    getMovieById(id: ID!): Movie
    getMoviesByDirector(director_name: String!): [Movie!]!
  }

  type Mutation {
    addMovie(movie: AddMovieInput!): Movie!
    updateMovie(id: ID!, movie: UpdateMovieInput!): Movie
    deleteMovieById(id: ID!): Boolean!
  }
`;

export default movieSchema;
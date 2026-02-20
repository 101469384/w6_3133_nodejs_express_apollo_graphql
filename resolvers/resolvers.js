import Movie from "../models/Movie.js";

export const movieResolvers = {
    Query: {
        getAllMovies: async () => {
            const movies = await Movie.find().lean();
            return movies;
        },

        getMovieById: async (_, { id }) => {
            return await Movie.findById(id).lean();
        },

        getMoviesByDirector: async (_, { director_name }) => {
            return await Movie.find({ director_name }).lean();
        },
    },

    Mutation: {
        addMovie: async (_, { movie }) => {
            const newMovie = await new Movie(movie).save();
            return newMovie.toObject();
        },

        updateMovie: async (_, { id, movie }) => {
            const updated = await Movie.findByIdAndUpdate(id, movie, {
                new: true,
            }).lean();
            return updated;
        },

        deleteMovieById: async (_, { id }) => {
            await Movie.findByIdAndDelete(id);
            return true;
        },
    },

    Movie: {
        id: (parent) => parent._id?.toString(),
    },
};
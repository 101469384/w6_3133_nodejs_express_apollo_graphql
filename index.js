import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";

import movieSchema from "./schemas/schema.js";
import { movieResolvers } from "./resolvers/resolvers.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {

    if (!process.env.MONGODB_URI) {
        throw new Error("Missing MONGODB_URI in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB Atlas");


    const server = new ApolloServer({
        typeDefs: movieSchema,
        resolvers: movieResolvers,
    });

    await server.start();


    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/graphql", expressMiddleware(server));


    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
}

startServer().catch((err) => {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
});
import { Client, Databases, ID, Query } from "react-native-appwrite";

// Track the searches made by user
// Check if the documenet is already stored or not
// If the document is fournd increment the search count-field
// If the document is not found create it

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

console.log(
  " process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID",
  process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  "process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID",
  process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
  "process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID",
  process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
);

export const updateSearchCount = async (query: string, movie: Movie) => {
  console.log("Entered here");

  try {
    console.log("Entered ");
    
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
console.log("Passed result");

    console.log("Appwrite result", result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log("error occured");

    console.log(error);
    throw error;
  }
};





    
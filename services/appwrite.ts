import {Client, Databases, Query} from "react-native-appwrite"

// Track the searches made by user

const DATABASE_ID= process.env.EXPO_PUBLIC_APPWRITE_DATABASE_URL!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(process.env.EXPO_PUBLIC_APPWRITE_PUBLIC_KEY!);

const database = new Databases(client);

console.log('====================================');
console.log("database",DATABASE_ID,COLLECTION_ID,database);
console.log('====================================');


export const updateSearchCount = async(query:string,movie:Movie) =>{

    console.log('====================================');
    console.log(3);
    console.log('====================================');

    const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm',query)
    ]);

    console.log('====================================');
    console.log(4);
    console.log('====================================');

    console.log(result)

    // Check if the documenet is already stored or not
    // If the document is fournd increment the search count-field 
    // If the document is not found create it
    
}
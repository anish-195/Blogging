import config from "../config/config";
import { Client,  ID , Databases, Storage, Query } from "appwrite";


export class  Service{

    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
          .setEndpoint(config.appwriteUrl) // Your API Endpoint
          .setProject(config.appwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
      }

      async createPost({title,slug, content, featuredImage, status, userId}) {
            try {   
                 return await this.databases.createDocument(
                    config.appwriteCollectionId,
                    config.appwriteCollectionId,
                    slug,
                    {
                      title,
                      content,
                      featuredImage, 
                      status,
                      userId  
                    }
                    
                 )
            }catch (error) {
                console.error("Create Post Error:", error);
                throw error;
            }
      }

      async UpdatePost(slug,{title, content, featuredImage, status, }) {
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage, 
                    status,   
                }
            )
        }catch(error){
            console.error("Update Post Error:", error);
            throw error;
        }
      }
      
      async DeletePost(slug) {
        try{
            return await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        }catch(error){
            console.error("Delete Post Error:", error);
            throw error;
            return false;
        }
      }

      async getPosts() {
        try {
          return await this.databases.getDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
          );
        }catch (error) {
            console.error("Get Posts Error:", error);
            throw error;
            
        } 
      }
    
      async getPosts(Queries = [Query.equal("status", "published")]) {

      }
}

const service = new Service();

export default service;
import config from "../../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class ConfigurationService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost(
    title: string,
    slug: string,
    content: string,
    featuredImage: string,
    userId: string,
    status: string
  ) {
    try {
      return await this.databases.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(
    title: string,
    slug: string,
    content: string,
    featuredImage: string,
    userId: string,
    status: string
  ) {
    try {
      return await this.databases.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(slug: string) {
    try {
      await this.databases.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete post");
      return false;
    }
  }
  async getPost(slug: string) {
    try {
      await this.databases.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get post");
      return false;
    }
  }
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get post");
      return false;
    }
  }
  // FILE UPLOAD SERVICES

  async uploadFile(file: File) {
    try {
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload File");
      return false;
    }
  }
  async deleteFile(fileId: string) {
    try {
      return await this.bucket.deleteFile(config.appWriteBucketId, fileId);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete file");
    }
  }
  getFilePreview(fileId: string) {
    return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
  }
}

const configurationService = new ConfigurationService();

export default configurationService;

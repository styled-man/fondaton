declare namespace NodeJS {
  interface ProcessEnv {
    // database
    DATABASE_URL: string;

    // authentication providers
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    APPLE_ID: string;
    APPLE_SECRET: string;
  }
  
}

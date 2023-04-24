declare namespace NodeJS {
    export interface ProcessEnv {
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      STRIPE_PUBLIC_KEY: string
      stripe_public_key: string
    }
  }
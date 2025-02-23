import { createClient, type ClientConfig } from "next-sanity";

// Sanity client configuration
const SanityClient: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: "2025-02-18",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

export default createClient(SanityClient);

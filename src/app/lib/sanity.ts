import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-02-15",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export default client;

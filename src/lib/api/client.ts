import { createDirectus, graphql, authentication } from "@directus/sdk";

export const apiClient = createDirectus("/api/directus")
  .with(graphql())
  .with(authentication("json"));

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { schemas } from './schema'

export const SanityConfig = defineConfig({
    name : 'default',
    title:'studio',
    basePath:'/studio',
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset:'production',
    token:process.env.NEXT_PUBLIC_SANITY_TOKEN,
    plugins:[structureTool(),visionTool()],
    schema : {
        types:schemas
    },
});

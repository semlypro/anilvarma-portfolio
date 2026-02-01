import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemas'
import { structure } from './sanity/desk/structure'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Anil Varma SEO Portfolio',

  projectId: projectId,
  dataset: dataset,

  plugins: [
    structureTool({
      structure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema: {
    types: schema,
  },

  basePath: '/studio',
})

import { StructureBuilder } from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Placeholder - will be populated with organized document lists
      ...S.documentTypeListItems(),
    ])

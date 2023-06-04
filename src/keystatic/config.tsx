import { config, fields, singleton } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },

  singletons: {
    site: singleton({
      label: 'Pengaturan Situs',
      path: '/src/content/site/site',
      format: 'yaml',
      schema: {
        title: fields.text({ label: 'Nama Situs' }),
        description: fields.text({ label: 'Deskripsi Situs' }),
        image: fields.text({ label: 'Gambar' }),
        menu: fields.array(
          fields.object({
            title: fields.text({ label: 'Nama' }),
            href: fields.text({ label: 'Link' }),
          }),
          { label: 'Tautan', itemLabel: (props) => props.fields.title.value }
        ),
      },
    }),
  },
})

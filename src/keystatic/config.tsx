import { config, fields, singleton, collection } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'radenpioneer',
      name: 'radenpioneer.blog'
    }
  },

  singletons: {
    site: singleton({
      label: 'Pengaturan Situs',
      path: '/src/content/site/site',
      format: 'yaml',
      schema: {
        title: fields.text({ label: 'Nama Situs' }),
        description: fields.text({ label: 'Deskripsi Situs' }),
        image: fields.image({
          label: 'Gambar',
          directory: 'src/assets/uploads/site',
          publicPath: 'src/assets/uploads/site',
        }),
        menu: fields.array(fields.slug({ name: { label: 'Menu' } }), {
          label: 'Tautan',
          itemLabel: (props) => props.value.slug,
        }),
      },
    }),
  },

  collections: {
    blog: collection({
      slugField: 'title',
      label: 'Artikel',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul' } }),
        description: fields.text({ label: 'Deskripsi', multiline: true }),
        image: fields.image({
          label: 'Gambar Cover',
          directory: 'src/assets/uploads/blog',
          publicPath: 'src/assets/uploads/blog/',
        }),
        date: fields.date({ label: 'Tanggal Terbit' }),
        tags: fields.array(fields.slug({ name: { label: 'Tag' } }), {
          label: 'Daftar Tag',
          itemLabel: (props) => props.value.name,
        }),
        draft: fields.checkbox({ label: 'Draf', defaultValue: true }),
        note: fields.checkbox({ label: 'Catatan', defaultValue: false }),
        content: fields.document({
          label: 'Konten',
          formatting: true,
          links: true,
          dividers: true,
          tables: true,
          images: {
            directory: 'public/uploads/blog',
            publicPath: 'uploads/blog/',
          },
        }),
      },
    }),
    page: collection({
      slugField: 'title',
      label: 'Halaman',
      path: 'src/content/page/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul' } }),
        description: fields.text({ label: 'Deskripsi', multiline: true }),
        image: fields.image({
          label: 'Gambar Cover',
          directory: 'src/assets/uploads/page',
          publicPath: 'src/assets/uploads/page/',
        }),
        draft: fields.checkbox({ label: 'Draf', defaultValue: true }),
        content: fields.document({
          label: 'Konten',
          formatting: true,
          links: true,
          dividers: true,
          tables: true,
          images: {
            directory: 'public/uploads/page',
            publicPath: '/uploads/page/',
          },
        }),
      },
    }),
  },
})

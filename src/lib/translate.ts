// const {Translate} = require('@google-cloud/translate').v2;
import { v2 } from '@google-cloud/translate'

export const client = new v2.Translate({
  projectId: import.meta.env.GCP_PROJECT_ID,
  credentials: {
    client_email: import.meta.env.GCP_CLIENT_EMAIL,
    private_key: import.meta.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
})

export const translate = async ({
  text,
  target,
}: {
  text: string[]
  target: string
}) => {
  const [translations] = await client.translate(text, target)

  return translations
}

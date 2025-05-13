import { NFTStorage, File } from 'nft.storage'
import fs from 'fs'
import path from 'path'


const API_TOKEN = 'api_token'


const imagePath = './roni-kene-pattern-test.png'


const client = new NFTStorage({ token: API_TOKEN })

async function main() {
  const content = await fs.promises.readFile(imagePath)
  const imageFile = new File([content], path.basename(imagePath), { type: 'image/png' })

  
  const metadata = {
    name: 'R0n1 K3n3 Pattern Test',
    description: 'Anaconda primordial, símbolo cósmico e criador na tradição Shipibo-Konibo.',
    image: imageFile,
    creator: {
      Shipibo_Konibo_Ancestral_Community: 'Santa Clara, Ucayali, Peru'
    },
    rights: 'Todos royalties automáticos garantidos para a comunidade'
  }

  console.log('Fazendo upload para IPFS + Filecoin...')
  const result = await client.store(metadata)
  
  console.log(' Upload concluído!')
  console.log(' Metadata URI:', result.url)
  console.log(' Image CID:', result.data.image.href)
}

main()

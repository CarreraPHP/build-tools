import path from 'path'
import {fileURLToPath} from 'url'
import getConfig from 'build-webpack'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const paths = {
    entry: path.resolve(__dirname,'src/index.js'),
    output: path.resolve(__dirname,'dist')
}

getConfig({
    paths
})
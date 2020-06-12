import fs from 'fs'
import path from 'path'

const getQuestionsData = (fileContents) => {
  const data = fileContents.map((object)=> {
    return {id: object.id, img: object.img, options: object.options}
  })
  return data;
}

export default function handler(req, res) {
  const dataDirectory = path.join(process.cwd(), 'pages/api/data.json')
  const fileContents = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))
  const data = getQuestionsData(fileContents['data']);
  res.status(200).json(data)
}
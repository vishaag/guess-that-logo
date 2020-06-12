import fs from 'fs'
import path from 'path'

const getAnswer = (fileContents, questionId) => {
  const answer = fileContents.find(object => object.id == questionId).answer;
  return { "answer": answer };
}

export default function handler(req, res) {
  const { questionId } = req.query
  const dataDirectory = path.join(process.cwd(), 'decks/data.json')
  const fileContents = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))
  const answer = getAnswer(fileContents['data'], questionId);
  res.status(200).json(answer) 
}

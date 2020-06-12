import fs from 'fs'
import path from 'path'

const answerSheet = {
  0: 1,
  1: 2,
  2: 0,
  3: 1,
  4: 1,
  5: 3,
  6: 3,
  7: 2,
  8: 0,
  9: 3,
  10: 2
}

const getAnswer = (fileContents, questionId) => {
  const answer = fileContents.find(object => object.id == questionId).answer;
  return { "answer": answer };
}

export default function handler(req, res) {
  const { questionId } = req.query
  const dataDirectory = path.join(process.cwd(), 'pages/api/data.json')
  const fileContents = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'))
  const answer = getAnswer(fileContents['data'], questionId);
  res.status(200).json(answer) 
}

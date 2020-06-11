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
export default function handler(req, res) {
  const { answerIndex, questionIndex } = req.query
  res.status(200).json(answerSheet[questionIndex]) 
}

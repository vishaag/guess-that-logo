import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET

const q = faunadb.query
const client = new faunadb.Client({ secret })

const getAnswer = (fileContents, questionId) => {
  const answer = fileContents[0].find(object => object.data.quizObjects.id == questionId).data.quizObjects.answer;
  return { "answer": answer };
}

export default async function handler(req, res) {
  const { questionId } = req.query
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Documents(
            q.Collection("public-decks")
          )
        ), 
        ref => q.Get(ref)
      )
    )
    const answer = getAnswer(dbs.data, questionId);
    res.status(200).json(answer)
  } catch (e) {
    res.status(500).json({ error: e.message })
}
}

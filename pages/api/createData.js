import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET

const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async function handler(req, res) {
  const quizObjects = req.body;
  try {
    const dbs = await 
    client.query(
      q.Create(
        q.Collection('public-decks'),
        { data: { quizObjects } },
      )
    )
    res.status(200).json(dbs)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
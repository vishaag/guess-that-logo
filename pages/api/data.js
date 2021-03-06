import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async function handler(req, res) {
  try {
    const dbs = await client.query(
      q.Get(q.Ref(q.Collection('public-decks'), '268584817066508812'))
    )
    res.status(200).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
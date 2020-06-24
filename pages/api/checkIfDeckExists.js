import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET

const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async function handler(req, res) {
  const query = req.query;
  try {
    let dbs = await client.query(
      q.Exists(q.Match(q.Index('public-decks-index'), query.deckName))
    )
    if(dbs) {
      res.status(200).json(true)
    } else {
      res.status(200).json(false)
    }
    
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
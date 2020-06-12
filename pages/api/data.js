import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET

const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async function handler(req, res) {
  try {
    const dbs = await client.query(
      q.Map(
        q.Paginate(
          q.Documents(
            q.Collection("frontend")
          )
        ), 
        ref => q.Get(ref)
      )
    )
    console.log(dbs.data)
    res.status(200).json(dbs.data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
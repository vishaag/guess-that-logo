import Link from 'next/link'
import Layout from '../components/layout'
import faunadb from 'faunadb'

export default function Home({ data }) {
return (
  <>
  <Layout title="Guess That Logo">
        {console.log(data)}
        <div className="row">

          <div className="sm-12 col">
            <h3>Featured Decks</h3>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/frontend.svg"></img>
                <h4 className="card-title">Frontend Tech Logos</h4>
            <Link href="/decks/[deckName]" as="/decks/frontend-tech"><button className="btn-block">Play</button></Link>
                </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/backend.svg"></img>
                <h4 className="card-title">Backend Tech Logos</h4>
                <Link href="/decks/[deckName]" as="/decks/backend-tech"><button className="btn-block">Play</button></Link>
              </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/jamsatck-tech.svg"></img>
                <h4 className="card-title">Jamstack Tech Logos</h4>
                <Link href="/decks/[deckName]" as="/decks/jamstack-tech">
                <button className="btn-block">Play</button></Link>
              </div>
            </div>
          </div>

        </div>
    
      
  </Layout>
  <div className="container">
    <div className="paper border border-3 border-primary padding-medium">
      <header>
        <h3>All Decks</h3>
      </header>
      <div className="row">
      {data.map(deck => {
        return(
          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <h4 className="card-title">{deck.title}</h4>
                <Link href="/decks/[deckName]" as={`/decks/${deck.url}`}>
                  <button className="btn-block">Play</button></Link>
              </div>
            </div>
          </div>
        )
      })}
      </div>

    </div>
  </div>
    <style jsx>{`

      .custom-card {
        background: white;
      }

      h3{
        margin: 0;
        text-align: center;
      }

    `}</style>
  </>
)
}

export async function getStaticProps() {

  const secret = process.env.FAUNADB_SECRET
  const q = faunadb.query
  const client = new faunadb.Client({ secret })

  try {
    let dbs = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("public-decks"))),
        q.Lambda(x => q.Get(x))
      )
    )
    
    const decknames = dbs.data.map((deck) => {
      return {
        url: deck.data.deckName,
        title: deck.data.title
      }
    })
    return {
      unstable_revalidate: 1,
      props: {
        data: decknames
      },
    }
  } catch (error) {
    return {
      props: {
        data: {}
      },
    }
  }
}

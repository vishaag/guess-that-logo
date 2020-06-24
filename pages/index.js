import Link from 'next/link'
import Layout from '../components/layout'
import faunadb from 'faunadb'

export default function Home({ data }) {
return (
  <>
  <Layout title="Guess That Logo">
        <div className="row">

          <div className="sm-12 col">
            <h3>Featured Decks</h3>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/frontend.svg"></img>

              <h4 className="card-title">Frontend Tech Logos</h4>
              <h5 class="card-subtitle">by <a href="https://twitter.com/@vishaag" target="_blank" >vishaag</a></h5>

            <Link href="/decks/[deckName]" as="/decks/frontend-tech"><button className="btn-block">Play</button></Link>
                </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/backend.svg"></img>
                <h4 className="card-title">Backend Tech Logos</h4>
              <h5 class="card-subtitle">by <a href="https://twitter.com/@vishaag" target="_blank" >vishaag</a></h5>
                <Link href="/decks/[deckName]" as="/decks/backend-tech"><button className="btn-block">Play</button></Link>
              </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <img src="/jamsatck-tech.svg"></img>
                <h4 className="card-title">Jamstack Tech Logos</h4>
              <h5 class="card-subtitle">by <a href="https://twitter.com/@vishaag" target="_blank" >vishaag</a></h5>
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
      {data.map((deck, index) => {
        return(
          <div className="sm-12 md-6 lg-4 col" key={index}>
            <div className="card custom-card">
              <div className="card-body">
                <h4 className="card-title">{deck.title}</h4>
                {deck.twitter && <h5 className="card-subtitle">by <a target="_blank" href={`https://twitter.com/${deck.twitter}`}>{deck.author}</a></h5>}

                {!deck.twitter && <h5 className="card-subtitle" >by {deck.author} </h5>}
                
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
  <footer>
      <p>Hosted on <a href="https://vercel.com" target="_blank" >▲Vercel</a> | by <a href="https://twitter.com/vishaag" target="_blank" >@vishaag</a> | <a href="https://github.com/vishaag/guess-that-logo" target="_blank" >Github</a></p>
  </footer>
    <style jsx>{`

      .custom-card {
        background: white;
      }

      h3{
        margin: 0;
        text-align: center;
      }

      footer {
        text-align: center;
      }

      p {
        font-size: 1.2em;
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
        title: deck.data.title,
        author: deck.data.author,
        twitter: deck.data.twitter
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

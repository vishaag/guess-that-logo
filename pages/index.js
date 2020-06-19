import Link from 'next/link'
import Layout from '../components/layout'

export default function Home() {
return (
  <Layout title="Guess That Logo">
        <div className="row">

          <div className="sm-12 col">
            <h3>Featured Decks</h3>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <h4 className="card-title">Guess that Frontend Logo</h4>
            <Link href="/decks/[deckName]" as="/decks/frontend"><button className="btn-block">Play</button></Link>
                </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <h4 className="card-title">Guess that Legacy Technology</h4>
                <Link href="/decks/[deckName]" as="/decks/legacy-technology"><button className="btn-block">Play</button></Link>
              </div>
            </div>
          </div>

          <div className="sm-12 md-6 lg-4 col">
            <div className="card custom-card">
              <div className="card-body">
                <h4 className="card-title">Guess that Beverage Logo</h4>
                <Link href="/decks/[deckName]" as="/decks/beverages"><button className="btn-block">Play</button></Link>
              </div>
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
  </Layout>
)
}


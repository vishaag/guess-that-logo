import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title }) {
  return (
    <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Do you think you can guess all the logos within 30 seconds?"
      />
      <meta
        property="og:image"
        content="/social-card.png"
      />
        <meta name="twitter:image" content="/social-card.png"></meta>
      <meta name="og:title" content="Guess That Frontend Logo" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
    <header>
      <div className="row flex-edges margin-small nav-buttons-container">
          <Link href="/"><button>Guess That Logo</button></Link>
          <Link href="/create"><button>Create new Deck</button></Link>
      </div>
    </header>
    <div className="container">
      <main className="paper border border-3 border-primary padding-medium">
        {children}
      </main>
    </div>
      <style jsx>{`
        .title {
          text-align: center;
          font-size: 2em;
        }

        .nav-buttons-container {
          z-index: 1;
          padding: 0.5em 1em 0.5em 1em;
          margin: 0;
          width: 100%;
        }

        @media screen and (min-width: 1350px) {
          .nav-buttons-container {
            position: absolute;
          }
        }

        .nav-buttons-container button {
         background: white;
        }
      `}</style>
    </>
  )
}

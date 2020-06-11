import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Guess That Frontend Logo</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:title" content="Guess that frontend logo!"/>
        <meta name="twitter:description" content="Do you think you can guess all the logos within 30 seconds?"/>
        <meta name="twitter:image" content="/twitter-card.png"/>
      </Head>

      <header>
        <h1 className="title">
          Guess That Frontend Logo!
        </h1>
      </header>
      <main className="paper border border-3 border-primary padding-medium">
      {children}
      </main>

      <style jsx>{`
      .title {
        text-align: center;
        font-size: 2em;
      }
      `}</style>
    </div>
  )
}

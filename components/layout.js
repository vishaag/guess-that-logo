import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Guess That Frontend Logo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1 className="title">
          Guess That Frontend Logo!
        </h1>
      </header>
      <main className="paper border border-3 border-primary">
      {children}
      </main>

      <style jsx>{`
      .title {
        text-align: center;
        font-size: 3em;
      }
      `}</style>
    </div>
  )
}

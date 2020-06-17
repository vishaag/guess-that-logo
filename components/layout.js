import Head from 'next/head'

export default function Layout({ children, title }) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Do you think you can guess all the logos within 30 seconds?"
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/vishaag/guess-that-logo/master/public/twitter-card.png"
        />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/vishaag/guess-that-logo/master/public/twitter-card.png"></meta>
        <meta name="og:title" content="Guess That Frontend Logo" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header>
        <h1 className="title">
          {title}
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

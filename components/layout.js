import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <header>
        <h1 className="title">
          Guess That Frontend Logo
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

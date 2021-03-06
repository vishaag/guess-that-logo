import { useState, useEffect } from 'react'
import { Share } from 'react-twitter-widgets'
import Layout from '../../components/layout';
import cn from 'classnames';
import faunadb from 'faunadb'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { shuffle } from 'lodash'

export default function Deck({ data }) {
  const router = useRouter()
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(30);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setshuffledOptions] = useState(shuffle([0, 1, 2, 3]));
  let timerClass = cn('bar striped success ', `w-${Math.floor(((counter) / 30) * 100)}`);
  let timer;

  useEffect(() => {
    if (start && counter > 0 && index < data.quizObjects.length) {
      timer = setTimeout(() => {
        setCounter(counter - 1)
      }, 1000);
    }
  }, [counter, start]);

  const handleClick = async function (e) {
    e.persist();
    const selectedAnswer = e.target.innerText;
    const answer = data.quizObjects[index].answer;
    if (answer == selectedAnswer) {
      setScore(score => score + 1)
      e.target.style.background = "green";
      e.target.style.color = "white";
    } else {
      e.target.style.background = "red";
      e.target.style.color = "white";
    }
    setTimeout(() => {
      setIndex(index => index + 1)
      e.target.style.background = "white";
      e.target.style.color = "black";
    }, 250);
  };

  const playAgain = function () {
    clearTimeout(timer);
    setshuffledOptions(shuffle([0, 1, 2, 3]))
    setScore(0)
    setCounter(30);
    setIndex(0);
  }

  if (router.isFallback) {
    return (
      <Layout title="Loading">
        <div className="row flex-center">
          <p>Loading</p>
        </div>
      </Layout>
    )
  }

  if(data) {
    if (start) {
      if (index < data.quizObjects.length && counter > 0) {
        return (
          <Layout title={data.title}>
            <div className="progress margin-bottom">
              <div className={timerClass}></div>
            </div>
            <div className="row flex-center">
              <img src={data.quizObjects[index].img} className="no-border" />
            </div>
            <ul className="row flex-edges child-borders child-shadows-hover">
              <li className="sm-12 md-5 lg-5 col" onClick={(e) => handleClick(e)}>{data.quizObjects[index].options[shuffledOptions[0]]}</li>
              <li className="sm-12 md-5 lg-5 col" onClick={(e) => handleClick(e)}>{data.quizObjects[index].options[shuffledOptions[1]]}</li>
              <li className="sm-12 md-5 lg-5 col" onClick={(e) => handleClick(e)}>{data.quizObjects[index].options[shuffledOptions[2]]}</li>
              <li className="sm-12 md-5 lg-5 col" onClick={(e) => handleClick(e)}>{data.quizObjects[index].options[shuffledOptions[3]]}</li>
            </ul>
            <p>{index + 1}/{data.quizObjects.length}</p>
            <style jsx>{`
            p {
              text-align: center;
            }

            ul {
              padding: 0;
            }

            ul li::before {
              content: "";
            } 
            
            img {
              height: 250px;
            }

            li {
              list-style-type: none;
              text-align: center;
              box-sizing: border-box;
              cursor: pointer;
              margin: 0.2em 0 0.2em 0;
            }
            
            @media (min-width:801px)  {
              li {
                margin: 1em 0 1em 0;
              }
            }

        `}</style>
          </Layout>
        )
      } else {
        return (
          <Layout title={data.title}>
            <div className="row flex-center">
              <h2 className="padding-small margin-small">Score: {score}/{data.quizObjects.length}</h2>
              <p className="col-12 col padding-small">Share on Twitter?</p>
              {counter > 0 &&
                <Share url="https://guess-that-logo.now.sh/" options={{ text: `I scored ${score}/${data.quizObjects.length} in ${data.title} with ${counter} seconds remaining! Play now to test your Logo Trivia knowledge!`, size: "large" }} />
              }
              {counter == 1 &&
                <Share url="https://guess-that-logo.now.sh/" options={{ text: `I scored ${score}/${data.quizObjects.length} in ${data.title} with ${counter} second remaining! Play now to test your Logo Trivia knowledge!`, size: "large" }} />
              }
              {counter == 0 &&
                <Share url="https://guess-that-logo.now.sh/" options={{ text: `I scored ${score}/${data.quizObjects.length} in ${data.title}! Play now to test your Logo Trivia knowledge!`, size: "large" }} />
              }
              <button className="btn-block" onClick={() => playAgain()}>Play Again!</button>
            </div>
            <style jsx>{`
            p {
              text-align: center;
              font-size: 1.5em;
            }

            button {
              margin-top: 2em;
            }
          `}</style>
          </Layout>
        )
      }
    } else {
      return (
        <Layout title={data.title}>
          <h4>{data.title}</h4>
          <div className="row flex-center">
            <img src="/frontLogo.svg" className="no-border"></img>
            <p className="col-12 col"> {data.introduction}</p>
            <button className="btn-block" onClick={() => setStart(true)}>Start Game</button>
          </div>
          <style jsx>{`
        img {
          height: 250px;
        }
          p {
            text-align: center;
            font-size: 1.5em;
          }

          h4 {
            text-align: center;
            margin: 0 0 1em 0;
          }
        `}</style>
        </Layout>
      )
    }
  } else {
    return (
      <Layout title="No Deck found! Create one?">
        <div className="row flex-center">
          <p>Sorry, the deck you requested does not exist. Do you want to create one?</p>
        </div>
        <div className="row flex-center">
          <Link href="/create"><button>Create New Deck &gt;</button></Link>
        </div>
      </Layout>
    )
  }
}




export async function getStaticPaths() {
  const secret = process.env.FAUNADB_SECRET
  const q = faunadb.query
  const client = new faunadb.Client({ secret })

  const dbs = await client.query(
    q.Map(q.Paginate(q.Documents(q.Collection("deck-names"))),
      ref => q.Get(ref)
    )
  )

  const deckNames = dbs.data.map(object => object.data.deckName);

  const paths = deckNames.map(deckName => {
    return { params: { deckName: deckName } }
  })

  return {
    paths: paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {

  const secret = process.env.FAUNADB_SECRET
  const q = faunadb.query
  const client = new faunadb.Client({ secret })

  try {
    let dbs = await client.query(
      q.Get(q.Match(q.Index('public-decks-index'), params.deckName))
    )
    return {
      unstable_revalidate: 1,
      props: {
        data: dbs.data
      },
    }
  } catch(error) {
    return {
      unstable_revalidate: 1,
      props: {
        data: false
      },
    }
  }
}

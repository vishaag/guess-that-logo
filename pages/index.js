import Head from 'next/head'
import useSWR from 'swr'
import {useState} from 'react'
import { Share } from 'react-twitter-widgets'
import Layout from '../components/layout';

export default function Home() {

  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error } = useSWR('api/data', fetcher);
  const [start, setStart] = useState(false);
  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(30);
  const [endMessage, setEndMessage] = useState('');

  React.useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter(counter - 1)
      }, 1000);
    }
  }, [counter, start]);

  const handleClick = async function (e,answerIndex, questionIndex) {
    e.persist()
    const res = await fetch(`api/checkAnswer?answerIndex=${answerIndex}&questionIndex=${questionIndex}`)
    const mark = await res.json()
    if(mark == true) {
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
    }, 500);
  };

  const playAgain = function() {
    setIndex(0);
    setCounter(30);
  }

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  if (start) {
    if (index < data.length && counter > 0) {
      return (
        <Layout>
          {counter}
          <div className="row flex-center">
              <img src={data[index].img} className="no-border"/>
          </div>
          <ul className="row flex-edges child-borders child-shadows-hover">
            <li className="sm-12 md-5 lg-5 col" onClick = {(e) => handleClick(e, 0, index)}>{data[index].options[0]}</li>
            <li className="sm-12 md-5 lg-5 col" onClick = {(e) => handleClick(e, 1, index)}>{data[index].options[1]}</li>
            <li className="sm-12 md-5 lg-5 col" onClick = {(e) => handleClick(e, 2, index)}>{data[index].options[2]}</li>
            <li className="sm-12 md-5 lg-5 col" onClick = {(e) => handleClick(e, 3, index)}>{data[index].options[3]}</li>
          </ul>
          <style jsx>{`
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
              margin: 1em 0 1em 0;
            }
        `}</style>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <div className="row flex-center">
            <p className="col-12 col">Share on Twitter?</p>
            <Share url="https://andrewsuzuki.com" options={{ text: "I just completed Guess That Frontend Logo! Play now to test Frontend Trivia knowledge!", size: "large" }} />
            <button className="btn-block" onClick={() => playAgain()}>Play Again!</button>
          </div>
          <style jsx>{`
            p {
              text-align: center;
            }

            button {
              margin-top: 2em;
            }
          `}</style>
        </Layout>
      )
    }
  } else {
    return(
      <Layout>
        <div className="row flex-center">
          <p className="col-12 col"> Do you think you can guess all the frontend logos?</p>
          <button className="btn-block" onClick={() => setStart(true)}>Start Game</button>
        </div>
        <style jsx>{`
          p {
            text-align: center;
          }
        `}</style>
      </Layout>
    )
  }
}

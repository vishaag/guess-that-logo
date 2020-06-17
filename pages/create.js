import {useState} from 'react'
import Layout from '../components/layout';
import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const q = faunadb.query

export default function Create() {
  const [deck, setDeck] = useState([
    {
      'img': '/img1.svg',
      options: ['', '', '', ''],
      answer: ''
    }
  ]);
  const [created, setCreated] = useState(false);

  const addAnotherObject = () => {
    if(deck.length < 20) {
      setDeck([
        ...deck,
        {
          'img': '',
          options: ['', '', '', ''],
          answer: ''
        }
      ])
    }
  }

  const removeObject = (index) => {
    let array = [...deck]; 
    array.splice(index, 1);
    setDeck(array);
  }

  const handleInput = (e, objectIndex, inputIndex) => {
    let array = [...deck];
    array[objectIndex].options[inputIndex] = e.target.value;
    if (inputIndex == 0) {
      array[objectIndex].answer = e.target.value;
    }
    setDeck(array);
  }

  const  handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`api/createData`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(deck)
        });
        setCreated(true)
      } catch (e) {
    }
  }

  if(!created) {
    return(
    <Layout title="Create a New Deck">
        <form onSubmit={handleCreate}>
      {deck.map((object, index) => (
          <div key={object.img}>
          <div className="row flex-edges margin-none">
            <p className="margin-none">{index+1})</p>
            <button className="clear padding-small margin-none" onClick={() => removeObject(index)}>X</button>
          </div>
          <div className="row flex-center">
              <img src={object.img} className="no-border"/>
          </div>
          <div className="row flex-spaces">
            <input className="sm-12 md-5 col padding-small background-success margin-small" placeholder="Correct Answer" required value={object.options[0]} onChange={(e) => handleInput(e, index, 0)}></input>
            <input className="sm-12 md-5 col padding-small background-danger margin-small" placeholder="Misleading Option" required value={object.options[1]}onChange={(e) => handleInput(e, index, 1)}></input>
            <input className="sm-12 md-5 col padding-small background-danger margin-small" placeholder="Close but Wrong Option" required value={object.options[2]} onChange={(e) => handleInput(e, index, 2)}></input>
            <input className="sm-12 md-5 col padding-small background-danger margin-small" placeholder="Surely Wrong Option" required value={object.options[3]} onChange={(e) => handleInput(e, index, 3)}></input>
          </div>
        </div>
      ))}
      <div className="row flex-center">
        <button type="button" className="paper-btn margin add-btn" onClick={() => addAnotherObject()}>+</button>
      </div>
      { (deck.length > 0) &&
        <div className="row flex-center">
          <button type="submit">Create Deck</button>
        </div>
      }
      </form> 


      <style jsx>{`            
        img {
          height: 150px;
        }
        .add-btn {
            padding: .6em 1em;
            border-top-left-radius: 185px 160px;
            border-top-right-radius: 200px 195px;
            border-bottom-right-radius: 160px 195px;
            border-bottom-left-radius: 185px 190px
        }

        p {
          font-size: 1.2em;
        }

        .clear {
          text-align: right;
        }
      `}</style>
    </Layout>
    )
  } else {
    return (
      <Layout>
        Deck Created!
      </Layout>
    )
  }
}

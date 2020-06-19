import {useState} from 'react'
import Layout from '../components/layout';
import kebabCase from 'lodash/kebabCase';
import Dropzone from '../components/dropzone'

export default function Create() {
  const [deck, setDeck] = useState([
    {
      'img': '',
      options: ['', '', '', ''],
      answer: ''
    }
  ]);
  const [created, setCreated] = useState(false);
  const [settings, setSettings] = useState({
    deckName: '',
    introduction: '',
    title: ''
  })

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

  const handleSettingsInput = (e) => {
    const property = e.target.getAttribute("name");
    let newSettingsState = { ...settings }
    newSettingsState[property] = e.target.value;
    if(property=='title') {
      newSettingsState['deckName'] = kebabCase(e.target.value);
    }
    setSettings(newSettingsState);
  }

  const  handleCreate = async (e) => {
    let obj = {
      ...settings,
      quizObjects: [...deck]
    }
    console.log(obj)
    e.preventDefault();
    try {
      const res = await fetch(`api/createData`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
        });
        setCreated(true)
      } catch (e) {
    }
  }

  const handleFileUpload = (url, index) => {
    let array = [...deck];
    array[index].img = url;
    setDeck(array);
    console.log(deck)
  }

  if(!created) {
    return(
    <>
    <Layout title="Create a New Deck">
      <form onSubmit={handleCreate}>
        <h4>Question / Answers</h4>
        {deck.map((object, index) => (
            <div key={index}>
              <div className="row flex-center">
                <div className="sm-2 md-2 col">
                  <Dropzone index={index} handleFileUpload={handleFileUpload}/>
                </div>
                
              </div>
              
            
            <div className="row flex-edges margin-none">
              <p className="margin-none">{index+1})</p>
              <button className="clear padding-small margin-none" onClick={() => removeObject(index)}>X</button>
            </div>

            <div className="row flex-spaces">
              <input className="sm-12 md-5 col padding-small background-success margin-small" placeholder="Correct Answer" required value={object.options[0]} onChange={(e) => handleInput(e, index, 0)}></input>
              <input className="sm-12 md-5 col padding-small background-warning margin-small" placeholder="Misleading Option" required value={object.options[1]}onChange={(e) => handleInput(e, index, 1)}></input>
              <input className="sm-12 md-5 col padding-small background-warning margin-small" placeholder="Close but Wrong Option" required value={object.options[2]} onChange={(e) => handleInput(e, index, 2)}></input>
              <input className="sm-12 md-5 col padding-small background-warning margin-small" placeholder="Surely Wrong Option" required value={object.options[3]} onChange={(e) => handleInput(e, index, 3)}></input>
            </div>
          </div>
        ))}

        <div className="row flex-center">
          <button type="button" className="paper-btn margin add-btn" onClick={() => addAnotherObject()}>+</button>
        </div>

        <div>
          <h4>First Page Settings</h4>
          <div className="row">
            <label><b>Title</b></label>
            <input name="title" required className="col-12 col fpsettings" value={settings.title} onChange={(e) => handleSettingsInput(e)}></input>
          </div>

          <div className="row flex-center">
            <label><b>URL</b></label>
            <div className="align-middle url-div">
              <label>guess-that-logo.now.sh/</label>
            </div>
                <div className="sm-10 md-7 col url-input-div align-middle fpsettings">
              <input name="deckName" required value={settings.deckName} onChange={(e) => handleSettingsInput(e)}></input>
            </div>
          </div>

          <div className="row flex-center">
            <label><b>Introduction</b></label>
                <textarea name="introduction" required className="col-12 col fpsettings" value={settings.introduction} onChange={(e) => handleSettingsInput(e)}></textarea>
          </div>

          {(deck.length > 0) &&
            <div className="row flex-center">
              <button type="submit">Create Deck</button>
            </div>
          }
        </div>
      </form>
      <style jsx>{`
      img {
        height: 250px;
      }

      .fpsettings input {
        margin: 0em;
        width: 100%;
        padding: 0.5em;
      }

      label {
        width: 100%;
        text-align: center;
      }

      .url-div {
        padding: 0;
        margin: 0;
      }

      .url-input-div{
        margin: 0;
        padding: 0 0em 0em 0.2em;
      }

      h4{
        text-align: center;
      }

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


    </>
    )

  } else {
    return (
      <Layout>
        Deck Created!
      </Layout>
    )
  }
}

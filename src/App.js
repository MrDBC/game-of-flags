
import {useEffect, useState} from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.css';
import nations from './nations'

function App() {

  const [random3countries, setRandom3Countries] = useState([]) // array of 3 random countries
  const [flag, setFlag]= useState({}) // out of those 3, select any 1(randomly)
  const [score, setScore] = useState({total:0, correct: 0, incorrect:0})
  const [clicked, setClicked] = useState(false)
  const [chosenCountry, setChosenCountry] = useState("")
  const [isChoiceCorrect, setIsChoiceCorrect ] = useState(false)

  const generateRandomCountries = ()=>{
    let countries= []
    let countryPresent = new Set()

    while(countries.length != 3){
      const randIdx= Math.floor(Math.random() * nations.length);
      if( !countryPresent.has(randIdx))
        countries.push(nations[randIdx]);
      countryPresent.add(randIdx)
    }

    setRandom3Countries(countries)
    let correctIdx = Math.floor(Math.random() * 3)
    setFlag(countries[correctIdx])

    console.log(countries, countries[correctIdx])
  }

  const checkAnswer = (selectedCountry)=>{
    setChosenCountry(selectedCountry.name)
    setClicked(true)
    if( selectedCountry.name === flag.name) { 
      setScore({...score, total: score.total+1, correct: score.correct+1})
      setIsChoiceCorrect(true)
      // alert('correct')
    }
    else{
      setScore({...score, total: score.total+1, incorrect: score.incorrect+1})
      setIsChoiceCorrect(false)
      // alert('wrong')
    }
      setTimeout(()=>{
        setClicked(false)
        nextQuestion()
      }, 2000)
      
  }

  const nextQuestion = ()=>{
    generateRandomCountries();

  }

  useEffect(()=>{
    generateRandomCountries()
  }, [])

  
  return (
    <div className="App">
      <div className='header'>
        <h1>Total Q: {score.total} </h1>
        <h1> Correct: {score.correct} </h1> 
        <h1> Incorrect: {score.incorrect}</h1>
      </div >
      <div className='flag'>
          {flag.name ? <span className={` fi fi-${flag[`alpha-2`].toLowerCase()}`}></span> 
          :null}
      </div>
      
      <div>
        {
          random3countries.map((c, i)=>  {
            return(
              // className='buttondiv' 
              <div className={`${'button-div'} ${(c.name == flag.name && clicked)? 'green' 
                  : (c.name != flag.name && clicked &&  c.name==chosenCountry)?'red'
                  : null}`}
                onClick={e=>checkAnswer(c)} >
                <button className='button' key={i}> {c.name} </button>
              </div>
            )})
        }
      </div>
      {/* { clicked ? 
          <div className={isChoiceCorrect?'correct':'incorrect' }>
              correct country: {flag.name} 
          </div> 
        : null }  */}
    </div>
  );
}

export default App;

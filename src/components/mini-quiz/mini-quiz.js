import './mini-quiz.css'
import noImage from '../images/default.png'
import str from '../images/str.webp'
import agi from '../images/agi.webp'
import int from '../images/int.webp'
import Loader from '../loader/loader'
import quizImage from '../images/dota-2-quiz.jpg'
import { useState, useEffect} from 'react'

const MiniQuiz = (props) => {
    const [image, setImage] = useState(noImage)
    const [rndImages, setRndImages] = useState([])
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)
    const [right, setRight] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [trueAnswer] = useState(Math.floor(Math.random() * 4))
    const [loading, setLoading] = useState(null)
    const [counter, setCounter] = useState(null)


    const {id, img, base_str, base_agi, base_int, str_gain, agi_gain, int_gain}
     = props.data[rndImages[trueAnswer]] ?? {}

    const showTrueAnswerImage = (event) => {
        setDisabled(true)
        if (event.target.getAttribute('answer-id') == id) {
            setScore(score => score + 100)
            setRight(right => right + 1)
            event.target.classList.add('rigth-answer')
        } else {
            event.target.classList.add('wrong-answer')
        }
        setImage('https://api.opendota.com' + img)
    }

    const resetScores = () => {
        if (props.gameStarted) {
            props.startGameTonggle()
        }
        setAttempts(0)
        setRight(0)
        setScore(0)
    }

    useEffect(() => {
        if (!props.gameStarted) {
            setLoading(null)
            setCounter(null)
            return
        }
        setLoading(loading => !loading)
    }, [props.gameStarted])

    useEffect(() => {
        counter > 1 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter])

    useEffect(() => {
        if (props.gameStarted) {
        const interval = setInterval(() => {
            if (props.data) {
                setCounter(15)
                const forRandomNumbers = [];
                for (let i = 0; i < 10; i++) {
                    let number = Math.floor(Math.random() * 139)
                    if (forRandomNumbers.includes(number) === false && props.data[number] && forRandomNumbers.length < 4) {
                        forRandomNumbers.push(number)
                    }
                }
                setRndImages(forRandomNumbers)      
                setDisabled(false)
                setImage(noImage)
                setAttempts(attempts => attempts + 1)
                const elements = document.querySelectorAll('.choose')
                elements.forEach(element => {
                    element.classList?.remove('wrong-answer')
                    element.classList?.remove('rigth-answer')
                    return element
                });
                setLoading(false)
            }
        }, 15000)
        return () => clearInterval(interval);
        }
    }, [props.gameStarted])


    const btnsChoose = rndImages.map((item, index) => {

        return <button
        disabled={disabled}
        answer-id={item}
        key={index}
        className='choose'
        onClick={(e) => showTrueAnswerImage(e)} style={{backgroundImage: `url(${"https://api.opendota.com" + props.data[item]?.img})`}}></button>
    })

    const checkloading = loading ? <Loader/> : null
    const content = props.gameStarted && loading === false ? 
    <GameInterface
    startGameTonggle={props.startGameTonggle}
    gameStarted={props.gameStarted}
    heroinfo={{base_str, base_agi, base_int,
               str_gain, agi_gain, int_gain,
               loading, btnsChoose, image,}}/> : null

    return (
        <div className='random-hero-blocks d-flex'>
            <div style={!content ? {backgroundImage: `url(${quizImage})`, backgroundSize:'100% 100%'} : {position:'relative'}} className='random-hero-info d-flex'>
                <span style={{fontSize: '24px', position: 'absolute', top:'5px', right:'9px'}}>{counter}</span>
                {checkloading}
                {content}
            </div>

            <div className="random-hero-btn">
                <div className='random-hero-btn-wrapper'>
                        <h5 style={{margin: '10px 0 0 0'}}>Mini squiz game for today
                    Try to guess what kind of hero this is?</h5>
                    <p className='rules-text'>
                    1. after game start search and filter will be disabled <br/>
                    2. you can pause the game after starting <br/>
                    3. after click reset your score will be reseted and game stopped :3 <br/>
                    happy game!
                    </p>
                    <p className='text2'>
                    <span style={{color: 'firebrick'}}>attempts: {attempts} / </span>
                    <span style={{color: 'green'}}>rigth: {right}</span>
                    <br/>
                    <span>score: {score}</span>
                    </p>
                    <button onClick={props.startGameTonggle} className='try button'>{props.gameStarted ? 'PAUSE': 'START'}</button>
                    <button onClick={resetScores} className='end button'>reset</button>
                </div>
            </div>
        </div>
    )
}


const GameInterface = (props) => {
    const {base_str, base_agi, base_int, str_gain, agi_gain, int_gain, btnsChoose, image} = props.heroinfo
    return (
            <div style={{margin: 'auto'}} className='d-flex'>
                <div>
                    <img className='random-hero-img' src={image} alt="random-hero" />
                    <p style={{margin: '0 20px'}}>What hero has such stats at the first level?</p>
                    <div className='random-hero-stats d-flex align-items-center justify-content-around'>
                        <div className='d-flex align-items-center'>
                            <img src={str} alt="str"/>
                            <p>{base_str}+{str_gain}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <img src={agi} alt="agi"/>
                            <p>{base_agi}+{agi_gain}</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <img src={int} alt="int"/>
                            <p>{base_int}+{int_gain}</p>
                        </div>
                    </div>
                </div>

                <div className="choose-hero-answer">
                    {btnsChoose}
                </div>
            </div>
        )
}


export default MiniQuiz;
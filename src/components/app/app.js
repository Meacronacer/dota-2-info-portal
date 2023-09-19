import './app.css'
import Filter from "../filter/filter";
import Header from "../header/header";
import HeroList from "../hero-list/hero-list";
import MiniQuiz from "../mini-quiz/mini-quiz";
import SideBar from "../sidebar/sidebar";
import DotaHeroes from '../../services/DotaHeroes';
import Footer from "../footer/footer";
import { useState, useEffect} from "react";

const dotaHeroes = new DotaHeroes();

const App = () => {
    const [data, setData] = useState({});
    const [hero, setHero] = useState('');
    const [lore, setLore] = useState('');
    const [read, setRead] = useState(false)
    const [filter, setFilter] = useState('')
    const [name, setName] = useState('')
    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        dotaHeroes.dotaHeroesInfo().then(data => setData(data))
        dotaHeroes.heroLore().then(data => setLore(data))
    }, [])

    useEffect(() => {
        setHero(data[1])
    }, [data])

    const heroSelected = (item) => {
        if (!gameStarted) {
            setHero(item)
        }
    }

    const prevNextHeroSelected = (id, direction) => {
        if (!name && !filter && !gameStarted) {
            if (id-1 === 138 && direction === '+') {
                setHero(data[1]);
                return;
            }

            if (id+1 === 1 && direction === '-') {
                setHero(data[138]);
                return;
            }

            while (data[id] === undefined) {
                direction === '+' ? id++ : id--
            }

            setHero(data[id])
        }
    }

    const startGameTonggle = () => {
        setGameStarted(gameStarted => !gameStarted)
    }

    const readToggle = () => {
        setRead(read => !read)
    }

    const filterByBtn = (attr) => {
        if (!gameStarted) {
            setFilter(attr === filter ? '': attr)
        }
    }
    
    const onSearchChange = (name) => {
        if (!gameStarted) {
            setName(name)
        }
    }

    const filterData = (arr) => {
        if (filter) {
            return arr.filter(item => item.primary_attr === filter)
        } else {
            return arr
        }
    }

    const searchHero = (arr) => {
        return arr.filter(item => item.localized_name.toLowerCase().indexOf(name) > -1)
    }

    const filteredData = filterData(searchHero(Object.values(data)))

    return (
        <div className="app">
            <div className="app-wrapper">
                <Header/>
                <MiniQuiz
                gameStarted={gameStarted}
                data={data ? data: {}}
                startGameTonggle={startGameTonggle}
                />
                <Filter filterByBtn={filterByBtn} filter={filter} onSearchChange={onSearchChange}/>
                <div className="d-flex list-sidebar">
                    <HeroList
                    name={name}
                    data={filteredData}
                    heroSelected={heroSelected}/>
                    <SideBar
                    prevNextHeroSelected={prevNextHeroSelected}
                    read={read}
                    readToggle={readToggle}
                    lore={lore}
                    hero={hero ? hero: {}}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default App;
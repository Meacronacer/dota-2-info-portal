import str from '../images/str.webp'
import agi from '../images/agi.webp'
import int from '../images/int.webp'
import all from '../images/all.webp'
import './hero-list-items.css'
import {motion} from 'framer-motion'

const HeroListItems = (props) => {
    const {img, localized_name, primary_attr} = props.data
    const res = [str,agi,int,all].filter(item => item.slice(14, 17) === primary_attr)

    return (
        <motion.div layout animate={{ opacity: 1}} initial={{opacity: 0}} exit={{ opacity: 0}}
        className="hero-item" onClick={props.heroSelected}>
            <img src={'https://api.opendota.com' + img} alt="Avatar" className="image"/>
            <div className="middle">
                <img src={res[0]} alt='attr' className="attr"/>
                <div className="text">{localized_name}</div>
            </div>
        </motion.div>
    )
}

export default HeroListItems;
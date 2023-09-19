import './hero-list.css'
import HeroListItems from '../hero-list-items/hero-list-items'
import { motion, AnimatePresence } from 'framer-motion'

const HeroList = (props) => {    

    const elements = Object.values(props.data).map(item => {
        return <HeroListItems
        data={item}
        key={item.id}
        heroSelected={() => props.heroSelected(item)}
        />
    })


    return (
        <motion.div layout className="container" >
            <motion.div layout className="row d-flex">
                <AnimatePresence>
                {elements.length === 0 && props.name ?
                <h1 style={{margin: '100px 0 0 150px', fontSize: '50px'}}>No Heroes match your filter</h1> : elements}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )

}
export default HeroList;
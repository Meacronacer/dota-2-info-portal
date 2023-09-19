import './filter.css'
import str from '../images/filter-str-active.png'
import agi from '../images/filter-agi-active.png'
import int from '../images/filter-int-active.png'
import uni from '../images/filter-uni-active.png'

const Filter = (props) => {

    const data = [
        [str, 'str'],
        [agi, 'agi'],
        [int, 'int'],
        [uni, 'all']
    ]

    const filterBtns = data.map((item, index) => {
        return <img key={index} src={item[0]} onClick={() => props.filterByBtn(item[1])} alt={item[1]} className={props.filter === item[1] ? 'attr-icon img-active': 'attr-icon'}/>
    })

    const onInputChange = event => {
        const name = event.target.value.toLowerCase();
        props.onSearchChange(name)
    }

    return (
        <div className='filter d-flex align-items-center'>
            <div className='attr-btns d-flex justify-content-between align-items-center'>
                <span>FILTER HERO</span>
                <span style={{marginLeft: '150px'}} >ATTRIBUTE</span>
                <div className='d-flex attribute'>
                    {filterBtns}
                </div>
            </div>


            <div className="hero-search d-flex align-items-center">
                <div className='qq'></div>
                <form action='#'>
                    <input onChange={onInputChange}></input>
                </form>
            </div>
        </div>
    )
}

export default Filter;
import './sidebar.css'
import damage from '../images/icon_damage.png'
import a_range from '../images/icon_attack_range.png'
import a_time from '../images/icon_attack_time.png'
import armor from '../images/icon_armor.png'
import m_resist from '../images/icon_magic_resist.png'
import move from '../images/icon_movement_speed.png'
import rev_time from '../images/icon_turn_rate.png'
import vision from '../images/icon_vision.png'
import str from '../images/str.webp'
import agi from '../images/agi.webp'
import int from '../images/int.webp'
import melee from '../images/melee.svg'
import range from '../images/ranged.svg'
import p_speed from '../images/icon_projectile_speed.png'
import { useRef } from 'react'


const SideBar = (props) => {
    let main_attr = 0
    const ref = useRef()

    const goUp = (id) => {
        id.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        props.readToggle()
      };

    const {
        id,
        img,
        name,
        primary_attr,
        localized_name,
        projectile_speed,
        base_health,
        base_mana,
        base_armor,
        base_health_regen,
        base_mana_regen,
        base_attack_min,
        base_attack_max,
        base_str,
        base_agi,
        base_int,
        str_gain,
        agi_gain,
        int_gain,
        roles,
        attack_type,
        attack_range,
        attack_rate,
        move_speed,
        day_vision,
        night_vision,
    } = props.hero
    
    switch(primary_attr) {
        case 'str':
            main_attr = base_str
            break
        case 'agi':
            main_attr = base_agi
            break
        case 'int':
            main_attr = base_int
            break
        default:
            main_attr =  Number(((base_str + base_agi + base_int) * 0.7).toFixed(0))
    }

    return (
        <div className="sidebar">
            <div className='sidebar-wrapper'>
                <div className='sidebar-top-wrapper d-flex'>
                    <button className='button-up' onClick={() => props.prevNextHeroSelected(id-1, '-')}></button>
                    <button className='button-down' onClick={() => props.prevNextHeroSelected(id+1, '+')}></button>
                    <div className='img-hp-mp d-flex'>

                        <img className='s-img' src={'https://api.opendota.com' + img} alt="hero" />
                        <div className='hero-hp d-flex align-items-center'>
                            <h4>{base_health ? base_health + (base_str * 22): ''}</h4>
                            <h5 className='base-hp'>+{(base_health_regen + base_str * 0.1).toFixed(1)}</h5>
                        </div>
                        <div className='hero-mp d-flex align-items-center justify-content-center'>
                            <h4>{base_mana ? base_mana + (base_int * 12): ''}</h4>
                            <h5 className='base-hp'>+{(base_mana_regen + base_int * 0.05).toFixed(1)}</h5>
                        </div>

                    </div>
                    <div className='sb-hero-info'>
                        <h1>{localized_name}</h1>
                        <button>HOMEPAGE</button>
                        <button>WIKI</button>
                    </div>
                </div>
            </div>

            <div ref={ref} className={props.read ? 'lore-text full-text': 'lore-text'}>
                <p>
                    {name ? props.lore[name.slice(14)]: "can't load hero lore story..."}
                </p>
                <div onPointerDown={(e) => goUp(ref.current)}
                     className={props.read ? 'full-story': 'full-story hidden'}
                >Close History</div>
            </div>
            <div onClick={props.readToggle} className={props.read ? 'full-story hidden': 'full-story'}>Read Full History</div>
            <div className='d-flex'>
                <img className='a-type-img' src={attack_type === 'Melee' ? melee : range} alt="atype" />
                <h3 className='attack_type'>{attack_type}</h3>
            </div>
            <h3 style={{margin: '10px 0'}}>{roles ? roles.join(', '): ''}</h3>
            <div className='d-flex align-items-center justify-content-around'>
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
            <br/>
            <div className="stats d-flex">
                <div className="attack align-items-center">
                    <div>
                        <img src={damage} alt="damage"/>
                        <p>{base_attack_min + main_attr}-{base_attack_max + main_attr}</p>
                    </div>
                    <div>
                        <img src={a_time} alt="a-time"/>
                        <p>{attack_rate}</p>
                    </div>
                    <div>
                        <img src={a_range} alt="a-dis"/>
                        <p>{attack_range}</p>
                    </div>
                    <div>
                        <img src={projectile_speed > 0 ? p_speed : ''} alt={projectile_speed > 0 ? 'p_speed': ''}/>
                        <p>{projectile_speed ? projectile_speed: ''}</p>
                    </div>
                </div>
                <div className='defense align-items-center'>
                    <div className="armor">
                        <img src={armor} alt="shield" />
                        <p>{(base_armor + base_agi / 6).toFixed(1)}</p>
                    </div>
                    <div className="magic-resist">
                        <img src={m_resist} alt="m-res" />
                        <p>25%</p>
                    </div>
                </div>
                <div className="mobility">
                    <div className="move-speed">
                        <img src={move} alt="mob" />
                        <p>{move_speed}</p>
                    </div>
                    <div className="time-reverse">
                        <img src={rev_time} alt="t-rev" />
                        <p>0.6</p>
                    </div>
                    <div className="vision">
                        <img src={vision} alt="vis" />
                        <p>{day_vision} / {night_vision}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar;
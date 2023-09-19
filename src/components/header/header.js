import './header.css'

const Header = () => {
    return (
        <div className="header d-flex align-items-center justify-content-between">
            <h1 className='header-name'>Dota 2 information portal</h1>
            <div className="header-heroes-items d-flex">
                <p className='header-p h-heroes'>Heroes</p>
                <p className='header-p'>/</p>
                <p className='header-p h-items'> Items</p>
            </div>
        </div>
    )
}

export default Header;
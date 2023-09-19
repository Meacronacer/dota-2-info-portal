import './footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <a href="https://www.valvesoftware.com/en/about">
                    <img className="footer-img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/valve_logo.png" alt=''/>
                </a>
                <a href="/">
                    <img className="footer-img" src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/dota_footer_logo.png" alt=''/>
                </a>
            </div>
        <div className="footer-info">Dota and the Dota logo are trademarks and/or registered trademarks of Valve Corporation. 2023 Valve Corporation, all rights reserved.</div>
        </div>
    )
}

export default Footer;
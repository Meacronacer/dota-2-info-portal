

class DotaHeroes {
    
    getFetch = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url} ${res.status}`);
        }

        return await res.json();
    }

    dotaHeroesInfo = () => {
        return this.getFetch('https://api.opendota.com/api/constants/heroes');
    }

    heroLore = () => {
        return this.getFetch('https://api.opendota.com/api/constants/hero_lore');
    }

}

export default DotaHeroes;
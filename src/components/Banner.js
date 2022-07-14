import '../styles/Banner.css';
import logo from '../assets/icon.png';

function Banner() {
    const title =  'Groupomania'
    return (
    <div className='groupo-banner'>
        <img src={logo} alt='La maison jungle' className='groupo-icon' />
        <h1 className='groupo-title'>{title}</h1>
    </div>)
}

export default Banner
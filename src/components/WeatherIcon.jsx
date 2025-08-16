import SunIcon from '../assets/icons/sun.png';
import CloudIcon from '../assets/icons/sun-cloud.png';
import RainIcon from '../assets/icons/rain2.png';
import SnowIcon from '../assets/icons/snow-cloud.png';
import ThunderIcon from '../assets/icons/thunderstorm.png';

const iconMap = {
    Clear: SunIcon,
    Clouds: CloudIcon,
    Rain: RainIcon,
    Snow: SnowIcon,
    Thunderstorm: ThunderIcon,

};

export default function WeatherIcon({ main, size = 48, alt}) {
    const iconSrc = iconMap[main] || SunIcon;
    return <img src={iconSrc} height={size} alt={alt} />
}
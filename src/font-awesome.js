import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Desativa a adição automática de CSS
// Ícones de marcas
import { 
  faInstagram, 
  faSpotify, 
  faYoutube, 
  faTwitter, // "faTwitter" será usado como "faXTwitter" 
  faBandcamp, 
  faSoundcloud, 
  faTiktok,
  faThreads
} from '@fortawesome/free-brands-svg-icons';


// Adicione os ícones à biblioteca
library.add(faInstagram, faSpotify, faYoutube, faTwitter, faBandcamp, faSoundcloud, faTiktok, faThreads);

export default FontAwesomeIcon;
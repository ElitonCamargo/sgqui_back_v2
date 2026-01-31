// ** src/permissions/usuario.permissions.js
import configuracao from './configuracao.maps.js';
import elemento from './elemento.maps.js';
import etapa_mp from './etapa_mp.maps.js';
import etapa from './etapa.maps.js';
import garantia from './garantia.maps.js';
import endpoints from './endpoints.maps.js';
import materia_prima from './materia_prima.maps.js';
import nutriente from './nutriente.maps.js';
import projeto from './projeto.maps.js';
import rbac from './rbac.maps.js';
import usuario from './usuario.maps.js';
  
export default [
  ...usuario,
  ...projeto,
  ...configuracao,
  ...garantia,
  ...elemento,
  ...etapa_mp,
  ...etapa,
  ...endpoints,
  ...materia_prima,
  ...nutriente,
  ...rbac
];
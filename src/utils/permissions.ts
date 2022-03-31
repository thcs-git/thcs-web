import SESSIONSTORAGE from "../helpers/constants/sessionStorage";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

/** * tipos de RIGHTS - Portal
 
CLIENTE
client.view
client.edit
client.create

PERMISSÕES
permissions.view
permissions.edit
permissions.create

INTEGRAÇÃO
integration.view
integration.edit
integration.create

TODOS PROFISSIONAIS
userclient.view
userclient.edit
userclient.create

MEUS PROFISSIONAIS
user.view
user.edit
user.create

PACIENTES
patient.view
patient.edit
patient.create

ATENDIMENTOS
care.view
care.edit
care.create

QR Code
qrcode.view
qrcode.edit
qrcode.create

AGENDA
schedule.view
schedule.edit
schedule.create

    .edit é permissão para editar e criar.
    .create é permissão para gerar(?)
 */

// checa se existe permissão view (visualizar)

const rights = sessionStorage.getItem(SESSIONSTORAGE.RIGHTS);
export function checkViewPermission(permissionType: string) {
  let check = false;
  let permission = `${permissionType}.view`;
  rights?.split('"').forEach((permissionItem: string) => {
    if (permissionItem === permission) {
      check = true;
      return permissionItem;
    }
  });

  return check;
}

// checa se existe permissão edit (editar e criar)
export function checkEditPermission(permissionType: string) {
  let check = false;
  let permission = `${permissionType}.edit`;
  rights?.split('"').forEach((permissionItem: string) => {
    if (permissionItem === permission) {
      check = true;
      return permissionItem;
    }
  });

  return check;
}

// checa se existe permissão create (gerar)
export function checkCreatePermission(permissionType: string) {
  let check = false;
  let permission = `${permissionType}.create`;
  rights?.split('"').forEach((permissionItem: string) => {
    if (permissionItem === permission) {
      check = true;
      return permissionItem;
    }
  });

  return check;
}

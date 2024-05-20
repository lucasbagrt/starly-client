import {
  mdiAccountCircle,
  mdiMonitor,  
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiAccountGroup,  
} from "@mdi/js";

export default [
  {
    to: "/dashboard",
    icon: mdiMonitor,
    label: "Restaurantes",
  },  
  {
    to: "/usuarios",
    label: "Usuários",
    icon: mdiAccountGroup,
  },
];

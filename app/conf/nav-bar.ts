import type { navBarDto } from "~/interfaces/navbar.dto";

export const navBarRoutes: navBarDto[] = [
    {
        link: '/personnages',
        iconName: 'mdi-light:account',
        name: 'Persos'
    },
    {
        link: '/visiteurs',
        iconName: 'mdi-light:home',
        name: 'Visiteur'
    },
    {
        link: '/fleurs',
        iconName: 'material-symbols-light:local-florist-outline',
        name: 'Fleurs'
    },
]
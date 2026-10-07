import type { navBarDto } from "~/interfaces/navbar.dto";

export const adminNavBarRoutes: navBarDto[] = [
    {
        link: '/admin/personnages',
        iconName: 'mdi-light:account',
        name: 'Personnages'
    },
    {
        link: '/admin/visiteurs',
        iconName: 'mdi-light:home',
        name: 'Visiteur'
    },
    {
        link: '/admin/fleurs',
        iconName: 'material-symbols-light:local-florist-outline',
        name: 'Fleurs'
    },
    {
        link: '/admin/items',
        iconName: 'mdi-light:gift',
        name: 'Items'
    },

]
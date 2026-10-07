import { FlowerMotifEnum } from "~/enum/flowerMotifEnum";

export const translateMotifEnum = (name: string) => {
    switch (name) {
        case FlowerMotifEnum.ALTERNATIF:
            return 'Alternatif'
        case FlowerMotifEnum.ANNEAU:
            return 'Anneau'
        case FlowerMotifEnum.BORD:
            return 'Bord'
        case FlowerMotifEnum.CONFETTI:
            return 'Confetti'
        case FlowerMotifEnum.COSMIQUE:
            return 'Cosmique'
        case FlowerMotifEnum.CRISTAL:
            return 'Cristal'
        case FlowerMotifEnum.FRAGMENTE:
            return 'Fragmenté'
        case FlowerMotifEnum.FUSION:
            return 'En fusion'
        case FlowerMotifEnum.GEL:
            return 'Gel'
        case FlowerMotifEnum.IRISE:
            return 'Irisé'
        case FlowerMotifEnum.LUEUR:
            return 'Lueur'
        case FlowerMotifEnum.NONE:
            return 'Aucun'
        case FlowerMotifEnum.OMBRE:
            return 'Ombré'
        case FlowerMotifEnum.PAILLETTES:
            return 'Pailleté'
        case FlowerMotifEnum.RAYE:
            return 'Rayé'
        case FlowerMotifEnum.RAYON_DE_SOLEIL:
            return 'Rayon de soleil'
        case FlowerMotifEnum.TACHETE:
            return 'Tacheté'
        default:
            return ''
    }
}
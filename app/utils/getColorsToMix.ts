import { FlowerMotifEnum } from "~/enum/flowerMotifEnum"
import type { DefaultColorsDto } from "~/interfaces/default-colors.dto"
import type { FlowerColorDto } from "~/interfaces/flower-color.dto"
import type { FlowerUserDto } from "~/interfaces/flower-user.dto"
import type { ResultSimulatorFlowersDto } from "~/interfaces/result-simulator-flowers.dto"

export const getColorToMix = (desiredColor: string | undefined) => {
    if (!desiredColor) {
        return []
    }
    switch (desiredColor) {
        case 'Corail':
            return ['Rouge', 'Orange']
        case 'Orange':
            return ['Rouge', 'Jaune']
        case 'Vert citron':
            return ['Jaune', 'Vert']
        case 'Vert':
            return ['Jaune', 'Bleu']
        case 'Bleu sarcelle':
            return ['Vert', 'Ciel']
        case 'Indigo':
            return ['Bleu', 'Violet']
        case 'Violet':
            return ['Rouge', 'Bleu']
        case 'Magenta':
            return ['Violet', 'Rose vif']
        case 'Rose pastel':
            return ['Blanc', 'Rouge']
        case 'Rosé':
            return ['Blanc', 'Corail']
        case 'Pêche':
            return ['Blanc', 'Orange']
        case 'Crème':
            return ['Blanc', 'Jaune']
        case 'Pistache':
            return ['Blanc', 'Vert citron']
        case 'Menthe':
            return ['Blanc', 'Vert']
        case 'Écume de mer':
            return ['Blanc', 'Bleu sarcelle']
        case 'Nuage':
            return ['Blanc', 'Ciel']
        case 'Glace':
            return ['Blanc', 'Bleu']
        case 'Bigorneau':
            return ['Blanc', 'Indigo']
        case 'Lilas':
            return ['Blanc', 'Violet']
        case 'Rose froid':
            return ['Blanc', 'Magenta']
        case 'Rose':
            return ['Blanc', 'Rose vif']
        case 'Gris':
            return ['Blanc', 'Noir']
        case 'Marron':
            return ['Orange', 'Noir']
        default:
            return []
    }
}


export const getMixSteps = (
    desiredColor: string,
    flower: FlowerUserDto,
    steps: ResultSimulatorFlowersDto[],
    colors: DefaultColorsDto[],
    flowersUser: FlowerUserDto[],
): ResultSimulatorFlowersDto[] => {
    // La couleur a déjà été obtenue précédemment
    if (
        steps.some(
            step => step.resultColor?.name === desiredColor
        )
    ) {
        return steps
    }

    // La couleur est déjà présente sur la fleur cible
    const existingColor = flower.colors.find(
        color => color.color1.name === desiredColor
    )

    if (existingColor) {
        return steps
    }

    // --------------------------------------------------
    // 3. Cherche la couleur sur une autre fleur
    // --------------------------------------------------
    const colorTransfer = getColorTransferStep(
        desiredColor,
        flower,
        flowersUser,
        colors
    )

    if (colorTransfer) {
        steps.push(colorTransfer)
        return steps
    }

    // --------------------------------------------------
    // 4. La couleur n'existe nulle part :
    //    on regarde si elle peut être mélangée
    // --------------------------------------------------
    const colorsToMix = getColorToMix(desiredColor)

    if (colorsToMix.length !== 2) {
        console.warn(
            `Impossible d'obtenir la couleur ${desiredColor}`
        )
        steps.push({ title: '', error: `Vous ne possédez pas la couleur ${desiredColor} pour continuer` })

        return steps
    }

    const [color1, color2] = colorsToMix

    // --------------------------------------------------
    // 5. Fabrique/transfère la première couleur
    // --------------------------------------------------
    if (color1) {
        getMixSteps(
            color1,
            flower,
            steps,
            colors,
            flowersUser
        )
    }

    // --------------------------------------------------
    // 6. Fabrique/transfère la deuxième couleur
    // --------------------------------------------------
    if (color2) {
        getMixSteps(
            color2,
            flower,
            steps,
            colors,
            flowersUser
        )
    }

    // --------------------------------------------------
    // 7. Vérifie que les deux couleurs sont disponibles
    // --------------------------------------------------
    const availableColor1 =
        isColorAvailable(color1, flower, steps)

    const availableColor2 =
        isColorAvailable(color2, flower, steps)

    if (!availableColor1 || !availableColor2) {
        console.warn(
            `Impossible de mélanger ${color1} + ${color2} pour obtenir ${desiredColor}`
        )
        steps.push({ title: '', error: `Quand vous aurez [${color1} + ${color2}], mélangez les pour obtenir ${desiredColor}` })
        return steps
    }

    // --------------------------------------------------
    // 8. Récupère les DefaultColorsDto
    // --------------------------------------------------
    const defaultColor1 = colors.find(
        color => color.name === color1
    )

    const defaultColor2 = colors.find(
        color => color.name === color2
    )

    const resultColor = colors.find(
        color => color.name === desiredColor
    )

    if (!defaultColor1 || !defaultColor2 || !resultColor) {
        console.warn(
            `Couleur introuvable dans colors pour ${desiredColor}`
        )

        return steps
    }

    // --------------------------------------------------
    // 9. Ajoute le mélange
    // --------------------------------------------------
    steps.push({
        title: 'Mélange',

        flower1: flower.flower,
        flower2: flower.flower,

        color1: {
            motif: FlowerMotifEnum.NONE,
            color1: defaultColor1,
        },

        color2: {
            motif: FlowerMotifEnum.NONE,
            color1: defaultColor2,
        },

        resultFlower: flower.flower,
        resultColor,
    })

    return steps
}

const isColorAvailable = (
    colorName: string | undefined,
    flower: FlowerUserDto,
    steps: ResultSimulatorFlowersDto[],
): boolean => {

    if (!colorName) {
        return false
    }

    if (
        flower.colors.some(
            color => color.color1.name === colorName
        )
    ) {
        return true
    }

    if (
        steps.some(
            step => step.resultColor?.name === colorName
        )
    ) {
        return true
    }

    return false
}

const getColorTransferStep = (
    desiredColor: string,
    selectedFlower: FlowerUserDto,
    flowersUser: FlowerUserDto[],
    colors: DefaultColorsDto[],
): ResultSimulatorFlowersDto | undefined => {

    const sourceFlower = flowersUser.find(
        flowerUser =>
            flowerUser.flower.id !== selectedFlower.flower.id &&
            flowerUser.colors.some(
                color =>
                    color.color1.name === desiredColor
            )
    )

    if (!sourceFlower) {
        return undefined
    }

    const sourceColor = sourceFlower.colors.find(
        color =>
            color.color1.name === desiredColor
    )

    if (!sourceColor) {
        return undefined
    }

    const resultColor = colors.find(
        color => color.name === desiredColor
    )

    if (!resultColor) {
        return undefined
    }

    return {
        title: 'Transfère',

        flower1: sourceFlower.flower,
        flower2: selectedFlower.flower,

        color1: sourceColor,

        resultFlower: selectedFlower.flower,
        resultColor,
    }
}

export const getMotifTransferStep = (
    desiredMotif: FlowerMotifEnum,
    desiredColor: string,
    selectedFlower: FlowerUserDto,
    flowersUser: FlowerUserDto[],
    colors: DefaultColorsDto[],
): ResultSimulatorFlowersDto | undefined => {

    // Le motif NONE ne nécessite aucun transfert
    if (desiredMotif === FlowerMotifEnum.NONE) {
        return undefined
    }

    const sourceFlower = flowersUser.find(
        flowerUser =>
            flowerUser.flower.id !== selectedFlower.flower.id &&
            flowerUser.colors.some(
                color =>
                    color.color1.name === desiredColor &&
                    color.motif === desiredMotif
            )
    )

    if (!sourceFlower) {
        return undefined
    }

    const sourceColor = sourceFlower.colors.find(
        color =>
            color.color1.name === desiredColor &&
            color.motif === desiredMotif
    )

    if (!sourceColor) {
        return undefined
    }

    const resultColor = colors.find(
        color => color.name === desiredColor
    )

    if (!resultColor) {
        return undefined
    }

    return {
        title: 'Transfère',

        flower1: sourceFlower.flower,
        flower2: selectedFlower.flower,

        color1: sourceColor,
        color2: sourceColor,

        resultFlower: selectedFlower.flower,
        resultColor,
    }
}


export const transferColor = (flowersUserTable: FlowerUserDto[], colorName: string, flower: FlowerUserDto) => {
    const motifFlowerWithDesiredColor = flowersUserTable?.find(element => element.colors.some(color => color.color1.name === colorName && color.motif !== 'NONE'))
    return {
        title: motifFlowerWithDesiredColor ? 'Transfère' : 'Impossible',
        flower1: motifFlowerWithDesiredColor ? motifFlowerWithDesiredColor.flower : undefined,
        flower2: flower.flower,
        color1: motifFlowerWithDesiredColor ? motifFlowerWithDesiredColor.colors.find(color => color.color1.name === colorName && color.motif !== 'NONE') : undefined,
        color2: undefined,
        resultFlower: flower.flower,
        resultColor: motifFlowerWithDesiredColor ? motifFlowerWithDesiredColor.colors.find(color => color.color1.name === colorName && color.motif !== 'NONE')?.color1 : undefined
    }
}

export const melangeColor = (flower: FlowerUserDto, color1: FlowerColorDto, color2: FlowerColorDto, resultColor: DefaultColorsDto) => {
    return {
        title: 'Mélange',
        flower1: flower.flower,
        flower2: flower.flower,
        color1,
        color2,
        resultFlower: flower.flower,
        resultColor
    }
}
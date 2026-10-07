import { Motif } from "~/generated/prisma/enums"

export const canHaveColor2 = (value: string) => {
    return value === Motif.OMBRE || value === Motif.BORD ||
        value === Motif.TACHETE || value === Motif.ALTERNATIF ||
        value === Motif.RAYE || value === Motif.FRAGMENTE ||
        value === Motif.ANNEAU || value === Motif.CONFETTI
}
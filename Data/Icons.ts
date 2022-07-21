

export function getIconForHero(heroId: string) {
    switch (heroId.toLowerCase()) {
        case "shez":
            return 'ShzF_base.png';
        case "ignatz":
            return 'Igna_base.png';
        case "dimitri":
            return 'Dimi_base.png';

        // TODO: MORE

        default:
            return null;
    }
}
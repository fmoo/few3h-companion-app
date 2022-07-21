import { usePersistedValue } from 'use-persisted-value';

export enum House {
    UNSET = 0,
    PROLOGUE,
    GOLDEN_DEER,
    BLUE_LIONS,
    BLACK_EAGLES
};

type HouseMetadata = {
    name: string,
    minChapter: number,
    maxChapter: number,
    baseChars: Array<string>,
    unlockChars: {
        [name: string]: {
            chapter: number,
            tactics?: boolean,
            secret?: boolean,
        },
    }
};

export function getHouseMetadata(house: House): HouseMetadata {
    switch (house) {
        case House.PROLOGUE:
            return {
                name: "Prologue",
                minChapter: 0,
                maxChapter: 1,
                baseChars: ["shez"],
                unlockChars: {},
            }
        case House.GOLDEN_DEER:
            return {
                name: "Golden Deer",
                minChapter: 2,
                maxChapter: 15,
                baseChars: ["shez", "claude", "lorenz", "hilda", "rephael", "lysithea", "ignatz", "marianne", "leonie"],
                unlockChars: {
                    "shamir": {"chapter": 4},
                    "linhardt": {"chapter": 4, tactics: true},
                    "balthus": {"chapter": 5, tactics: true},
                    "holst": {"chapter": 6},
                    "bernadetta": {"chapter": 6, tactics: true},
                    "petra": {"chapter": 7, tactics: true},
                    "hapi": {"chapter": 9, tactics: true},
                    "constance": {"chapter": 9, tactics: true},
                    "yuri": {"chapter": 10, tactics: true},
                    "byleth": {"chapter": 10, tactics: true, secret: true},
                    "jeralt": {"chapter": 10, tactics: true, secret: true},
                    "ashe": {"chapter": 11, tactics: true},
                },
            }
        case House.BLUE_LIONS:
            return {
                name: "Blue Lions",
                minChapter: 2,
                maxChapter: 15,
                baseChars: ["shez", "dimitri", "dedue", "felix", "mercedes", "ashe", "annette", "sylvain", "ingrid"],
                unlockChars: {
                    "rodrigue": {"chapter": 4},
                    "petra": {"chapter": 4, tactics: true},
                    "hapi": {"chapter": 4, tactics: true},
                    "seteth": {"chapter": 5},
                    "flayn": {"chapter": 5},
                    "dorothea": {"chapter": 5, tactics: true},
                    "bernadetta": {"chapter": 6, tactics: true},
                    "shamir": {"chapter": 9, tactics: true},
                    "yuri": {"chapter": 9, tactics: true},
                    "catherine": {"chapter": 10},
                    "lorenz": {"chapter": 10},
                    "ignatz": {"chapter": 10},
                    "raphael": {"chapter": 10},
                    "marianne": {"chapter": 10},
                    "balthus": {"chapter": 10, tactics: true},
                    "linhardt": {"chapter": 11, tactics: true},
                    "constance": {"chapter": 11, tactics: true},
                    "byleth": {"chapter": 12, tactics: true, secret: true},
                    "jeralt": {"chapter": 12, tactics: true, secret: true},
                    "jeritza": {"chapter": 13, tactics: true},
                },
            }
        case House.BLACK_EAGLES:
            return {
                name: "Black Eagles",
                minChapter: 2,
                maxChapter: 15,
                baseChars: ["shez", "edelgard", "hubert", "dorothea", "ferdinand", "bernadetta", "caspar", "petra", "linhardt"],
                unlockChars: {
                    "monica": { "chapter": 3 },
                    "manuela": { "chapter": 4 },
                    "jeritza": { "chapter": 4 },
                    "constance": { "chapter": 4, tactics: true },
                    "hapi": { "chapter": 4, tactics: true },
                    "ashe": { "chapter": 5, tactics: true },
                    "lorenz": { "chapter": 6, tactics: true },
                    "ignatz": { "chapter": 6, tactics: true },
                    "balthus": { "chapter": 6, tactics: true },
                    "raphael": { "chapter": 7, tactics: true },
                    "lysithea": { "chapter": 7, tactics: true },
                    "marianne": { "chapter": 7, tactics: true },
                    "mercedes": { "chapter": 8, tactics: true },
                    "shamir": { "chapter": 9, tactics: true },
                    "yuri": { "chapter": 10, tactics: true },
                    "byleth": { "chapter": 10, tactics: true, secret: true },
                    "jeralt": { "chapter": 10, tactics: true, secret: true },
                    "leonie": { "chapter": 12, tactics: true, secret: true },
                },
            }
    }
    console.log(`Unknown case: ${house}`);
    return {
        name: "",
        minChapter: 0,
        maxChapter: 1,
        baseChars: [],
        unlockChars: {},
    };
}

export function useRoster(): Array<string> {
    const [house] = useHouse();
    const [currentChapter] = useChapter();

    const {baseChars, unlockChars} = getHouseMetadata(house);

    if (baseChars == null) {
        return ["shez"];
    }

    const result = baseChars.slice();

    // Add unlockChars based on progress
    for (const key of Object.keys(unlockChars)) {
        const {chapter, tactics = false, secret = false} = unlockChars[key];

        if (currentChapter >= chapter + (tactics ? 1 : 0)) {
            result.push(key);
        }
    }
    return result;
}


const useHouse = () => usePersistedValue<House>('house');

const useChapter = () => {
    const [house] = useHouse();
    return usePersistedValue<number>(`chapter:${house}`, 1);
}

export {
    useHouse,
    useChapter,
};



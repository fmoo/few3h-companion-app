import { usePersistedValue } from "use-persisted-value";


export function getSupportKey(heroId1: string, heroId2: string) {
    heroId1 = heroId1.toLowerCase();
    heroId2 = heroId2.toLowerCase();
    if (heroId1 <= heroId2) {
        return `${heroId1}:${heroId2}`;
    } else {
        return `${heroId2}:${heroId1}`;
    }
}


export function useSupportState() {
    const [supportState, setSupportState] = usePersistedValue<{ [supportKey: string]: string }>('supports', {});

    function setSupportLevel(heroId1: string, heroId2: string, level: string) {
        const newState = {...supportState};
        newState[getSupportKey(heroId1, heroId2)] = level;
        setSupportState(newState);
    }
    function getSupportLevel(heroId1: string, heroId2: string) {
        return supportState[getSupportKey(heroId1, heroId2)] ?? '';
    }

    return {
        setSupportLevel,
        getSupportLevel,
    };
}
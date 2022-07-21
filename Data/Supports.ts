import { getSupportKey } from "../State/Supports";
import { useCSV } from "../Util/CSV";


export function useSupportsData() {
    const supportsData = useCSV(require('../assets/supports.csv'), 1);
    const result = {};

    if (supportsData != null) {
        for (const row of supportsData) {
            result[getSupportKey(row[0], row[1])] = row[2];
        }
    }

    function getMaxSupportScene(heroId1: string, heroId2: string): string {
        return result[getSupportKey(heroId1, heroId2)] ?? '';
    }

    function getMaxSupportLevel(heroId1: string, heroId2: string): string {
        if (heroId1.toLowerCase().startsWith('byleth') || heroId2.toLowerCase().startsWith('byleth') ) {
            return 'A';
        }
        return result[getSupportKey(heroId1, heroId2)] ?? 'C';
    }
    
    return {getMaxSupportLevel, getMaxSupportScene};
}


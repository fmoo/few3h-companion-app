import { useAssets } from 'expo-asset';
import { useEffect, useState } from 'react';
import { readString } from 'react-native-csv';

export function useCSV(assetId: number, skipRows: number) {
  const [rows, setRows] = useState<Array<Array<string>>>(null);

  const [assets, errors] = useAssets([assetId]);

  useEffect(() => {
    const doFetch = async () => {
      if (errors != null) {
        console.error(errors);
        return;
      }

      if (assets == null) {
        return;
      }

      const [asset] = assets;

      const resp = await fetch(asset.localUri);
      const textContents = await resp.text();
      const parseResult = readString(textContents);

      let ii: number = -1;
      const newRows = [];
      for (const item of Object.values(parseResult.data)) {
        const row = item as string[];
        ii += 1;
        if (ii < skipRows) {
          continue;
        }
        newRows.push(row);
      }
      setRows(newRows);
    };
    doFetch().catch(console.error);
  }, [assets, errors, skipRows]);

  return rows;
}

export function useHeroGifts(heroId: string) {
  let favorites = null;
  let dislikes = null;

  const allGifts = useCSV(require('../assets/gifts.csv'), 2);
  for (const row of allGifts) {
    if (String(row[0]).toLowerCase() == heroId || (heroId == 'byleth' && row[0] == 'Byleth F')) {
      favorites = row.slice(1, 8).filter((f) => f != 'none');
      dislikes = row.slice(8).filter((f) => f != 'none');
    }
  }

  return { favorites, dislikes };
}

export function useAbilities() {
  const abilities = useCSV(require('../assets/abilities.csv'), 3);

  if (abilities == null) {
    return null;
  }

  const result = {};
  for (const abilityRow of abilities) {
    result[abilityRow[1]] = abilityRow[3];
  }
  return result;
}

export function useInnateAbilities() {
  let ability = null;
  const abilities = useAbilities();
  const allInnates = useCSV(require('../assets/innate-abilities.csv'), 2);
  const results = {};

  if (abilities == null || allInnates == null) {
    return null;
  }

  for (const row of allInnates) {
    let heroId = String(row[0]).toLowerCase();
    if (heroId.endsWith(' (f)')) {
      heroId = heroId.slice(0, heroId.length - 4);
    }
    if (heroId.endsWith(' f')) {
      heroId = heroId.slice(0, heroId.length - 2);
    }
    ability = row[1];
    results[heroId] = {
      ability,
      job: row[2],
      description: abilities[ability],
    };
  }

  return results;
}

import { useEffect, useState, useCallback } from 'react';

export function useIcon() {
  const [iconPacks, setIconPacks] = useState<Record<string, any>>({});

  useEffect(() => {
    const loadPacks = async () => {
      const packs = await Promise.all([import('react-icons/tb')]);

      const packKeys = ['tb'];

      const newPacks: Record<string, any> = {};

      for (const [index, key] of packKeys.entries()) {
        newPacks[key] = packs[index];
      }

      setIconPacks(newPacks);
    };

    loadPacks();
  }, []);

  const getIconByName = useCallback(
    (name: string) => {
      const packKey = Object.keys(iconPacks).find((key) => name.toLowerCase().startsWith(key));

      if (!packKey) return null;

      const pack = iconPacks[packKey];
      const IconComponent = pack[name];

      if (!IconComponent) return null;

      return <IconComponent />;
    },
    [iconPacks],
  );

  return getIconByName;
}

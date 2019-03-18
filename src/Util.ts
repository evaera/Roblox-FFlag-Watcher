const flagTypes = {
  FFlag: 'Flag',
  DFFlag: 'Dynamic Flag',
  SFFlag: 'Studio Flag',
  FInt: 'Int',
  FString: 'String',
  FLog: 'Log',
  DFInt: 'Dynamic Int',
  DFString: 'Dynamic String',
  DFLog: 'Dynamic Log'
}

interface FlagType {
  type?: string
  name: string
}

export function getFlagType (flag: string): FlagType {
  const typeEntry = Object.entries(flagTypes).find(([prefix]) => flag.startsWith(prefix))

  if (typeEntry) {
    const [prefix, type] = typeEntry

    return {
      type,
      name: flag.slice(prefix.length)
    }
  }

  return {
    name: flag
  }
}

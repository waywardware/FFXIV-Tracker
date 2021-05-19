
export interface CollectionItem {
    icon: string;
    name: string;
    obtained: boolean;
    itemId: string;
    sources: Array<CollectionSource>;
}

export interface CollectionSource {
    text: string
}

export interface PlayerInfo {
    character: Character;
    mounts: Set<String>;
    minions: Set<String>;
}

export interface Character {
    playerId: string;
    icon: string;
    name: string;
    server: string;
}
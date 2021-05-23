
export interface CollectionItem {
    icon: string;
    name: string;
    obtained: boolean;
    itemId: number;
    sources: Array<CollectionSource>;
}

export interface CollectionSource {
    text: string
}

export interface PlayerInfo {
    character: Character;
    mounts: Set<string>;
    minions: Set<string>;
}

export interface Character {
    playerId: string;
    icon: string;
    name: string;
    server: string;
} 

export interface CharacterCollectionResult<T> {
    character: Character
    collection: Array<T>
}
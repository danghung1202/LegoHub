export interface Set {
    setID: number;
    number: string;
    numberVariant: number;
    name: string;
    year: string;

    theme: string;
    themeGroup: string;
    subtheme: string;
    pieces: string;
    minifigs: string;

    image: boolean;
    imageFilename: string;
    thumbnailURL: string;
    largeThumbnailURL: string;
    imageURL: string;

    bricksetURL: string;
    released: boolean;
    owned: boolean;
    wanted: boolean;
    qtyOwned: number;

    userNotes: string;
    ACMDataCount: number;
    ownedByTotal: number;
    wantedByTotal: number;
    UKRetailPrice: string;

    USRetailPrice: string;
    CARetailPrice: string;
    EURetailPrice: string;
    USDateAddedToSAH: string;
    USDateRemovedFromSAH: string;

    rating: string;
    reviewCount: number;
    packagingType: string;
    availability: string;
    instructionsCount: number;

    additionalImageCount: number;
    EAN: string;
    UPC: string;
    description: string;
    lastUpdated: string;
}
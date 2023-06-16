export interface pharmacyData {
    name: string;
    address: Address;
    primaryPhoneNumber: string;
    pharmacyHours?: string
}

export interface Address {
    addressType: string;
    city: string;
    externalId: string;
    googlePlaceId: string;
    isValid: boolean;
    latitude: number;
    longitude: number;
    postalCode: string;
    streetAddress1: string;
    usTerritory: string;
}
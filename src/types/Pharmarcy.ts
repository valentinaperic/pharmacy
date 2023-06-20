export interface pharmacyData {
    id: string;
    pharmacies: string[];
    pharmacyChainId: string;
    name: string;
    active: boolean;
    localId: string;
    acceptInvalidAddress: boolean;
    testPharmacy: boolean;
    address: Address;
    checkoutPharmacy: boolean;
    defaultTimeZone: any;
    primaryPhoneNumber: string;
    pharmacyHours?: string
    pharmacistInCharge: string | null;
    postalCodes: string[] | null;
    deliverableStates: string[];
    deliverySubsidyAmount: number | null;
    pharmacySystem: string;
    pharmacyType: string;
    pharmacyLoginCode: string | null;
    marketplacePharmacy: boolean;
    importActive: boolean;
    ordered: boolean;
}

export interface Address {
    streetAddress1: string;
    city: string;
    usTerritory: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    addressType: string;
    externalId: string;
    isValid: boolean;
    googlePlaceId: string;
}

export interface Pharmacy {
    name: string;
    pharmacyId: string;
    ordered: boolean;
    medications: string[];
}

export interface Medication {
    id: string;
    name: string;
}
  
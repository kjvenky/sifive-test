// Define the expected structure of the JSON data
export interface Port {
    baseAddress: number;
    protocol: string;
    sizeBytes: number;
    widthBits: number;
}

export interface OverlapResult {
    port1: string;
    port2: string;
    start: number;
    end: number;
}

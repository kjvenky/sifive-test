import { OverlapResult } from "./interfaces";

// Updated checkForOverlaps function
export function checkForOverlaps(ports: Record<string, { baseAddress: number; sizeBytes: number; [key: string]: any }>): OverlapResult[] {
    // Calculate ranges for each port
    const ranges = Object.keys(ports).map((portKey) => {
        const { baseAddress, sizeBytes } = ports[portKey];
        return { key: portKey, start: baseAddress, end: baseAddress + sizeBytes };
    });

    // Sort ranges by starting address (baseAddress)
    ranges.sort((a, b) => a.start - b.start);

    const overlaps: OverlapResult[] = [];

    // Check for overlaps only with adjacent ranges (since sorted)
    for (let i = 0; i < ranges.length - 1; i++) {
        const current = ranges[i];
        const next = ranges[i + 1];

        // If the end of the current range overlaps with the start of the next range
        if (current.end > next.start) {
            overlaps.push({
                port1: current.key,
                port2: next.key,
                start: next.start,
                end: Math.min(current.end, next.end),
            });
        }
    }

    return overlaps;
}


import { checkForOverlaps } from "../helper";
const { expect } = require('chai');

describe('Overlap Detection', () => {
    it('should detect overlaps between two ports', () => {
        const ports = {
            Port0: { baseAddress: 1000, protocol: 'AHB_LITE', sizeBytes: 1000, widthBits: 32 },
            Port1: { baseAddress: 1500, protocol: 'AHB_LITE', sizeBytes: 1000, widthBits: 32 },
        };
        const overlaps = checkForOverlaps(ports);
        expect(overlaps).to.have.lengthOf(1);
        expect(overlaps[0]).to.deep.equal({ port1: 'Port0', port2: 'Port1', start: 1500, end: 2000 });
    });

    it('should detect multiple overlaps', () => {
        const ports = {
            Port0: { baseAddress: 1000, protocol: 'AHB_LITE', sizeBytes: 2000, widthBits: 32 }, 
            Port1: { baseAddress: 1500, protocol: 'AHB_LITE', sizeBytes: 1000, widthBits: 32 }, 
            Port2: { baseAddress: 2500, protocol: 'AHB_LITE', sizeBytes: 1000, widthBits: 32 },
        };
        const overlaps = checkForOverlaps(ports);
        expect(overlaps).to.have.lengthOf(1);
        expect(overlaps[0]).to.deep.equal({ port1: 'Port0', port2: 'Port1', start: 1500, end: 2500 });
    });

    it('should detect no overlaps', () => {
        const ports = {
            Port0: { baseAddress: 1000, protocol: 'AHB_LITE', sizeBytes: 500, widthBits: 32 },
            Port1: { baseAddress: 2000, protocol: 'AHB_LITE', sizeBytes: 500, widthBits: 32 },
            Port2: { baseAddress: 3000, protocol: 'AHB_LITE', sizeBytes: 500, widthBits: 32 },
        };
        const overlaps = checkForOverlaps(ports);
        expect(overlaps).to.be.empty;
    });

    it('should detect overlaps in a complex scenario', () => {
        const ports = {
            Port0: { baseAddress: 1000, protocol: 'AHB_LITE', sizeBytes: 3000, widthBits: 32 }, 
            Port1: { baseAddress: 1500, protocol: 'AHB_LITE', sizeBytes: 2000, widthBits: 32 }, 
            Port2: { baseAddress: 4000, protocol: 'AHB_LITE', sizeBytes: 1000, widthBits: 32 }, 
        };
        const overlaps = checkForOverlaps(ports);
        expect(overlaps).to.have.lengthOf(1);
        expect(overlaps[0]).to.deep.equal({ port1: 'Port0', port2: 'Port1', start: 1500, end: 3500 });
    });
});
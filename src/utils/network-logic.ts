/**
 * Network Calculation Logic for IT Tech Tools
 * Functional approach for performance and testability.
 */

export interface SubnetResult {
  network: string;
  broadcast: string;
  mask: string;
  hostRange: string;
  totalHosts: number;
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult | null {
  try {
    const ipParts = ip.split('.').map(Number);
    if (ipParts.length !== 4 || ipParts.some(p => p < 0 || p > 255)) return null;

    const ipInt = (ipParts[0] << 24) >>> 0 | (ipParts[1] << 16) >>> 0 | (ipParts[2] << 8) >>> 0 | ipParts[3] >>> 0;
    const maskInt = (0xffffffff << (32 - cidr)) >>> 0;
    
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | ~maskInt) >>> 0;
    
    const intToIp = (int: number) => [
      (int >>> 24) & 0xff,
      (int >>> 16) & 0xff,
      (int >>> 8) & 0xff,
      int & 0xff
    ].join('.');

    const firstHost = networkInt + 1;
    const lastHost = broadcastInt - 1;

    return {
      network: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      mask: intToIp(maskInt),
      hostRange: `${intToIp(firstHost)} - ${intToIp(lastHost)}`,
      totalHosts: Math.max(0, broadcastInt - networkInt - 1),
    };
  } catch (e) {
    return null;
  }
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

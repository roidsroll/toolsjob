/**
 * Genius Tool Logic Engine - Monochrome Edition
 */

// 1. Password Generator
export const generatePassword = (length: number, useSymbols: boolean, useNumbers: boolean) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
    (useNumbers ? "0123456789" : "") + 
    (useSymbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

// 2. Base Converter
export const convertBase = (value: string, fromBase: number, toBase: number) => {
  if (!value) return "";
  try {
    const decimal = parseInt(value, fromBase);
    if (isNaN(decimal)) return "ERR";
    return decimal.toString(toBase).toUpperCase();
  } catch (e) { return "ERR"; }
};

// 3. Bandwidth Calculator
export const convertBandwidth = (value: number, fromUnit: string, toUnit: string) => {
  const units: {[key: string]: number} = {
    'bps': 1, 'kbps': 1000, 'mbps': 1000000, 'gbps': 1000000000,
    'B/s': 8, 'KB/s': 8000, 'MB/s': 8000000, 'GB/s': 8000000000
  };
  const bps = value * (units[fromUnit] || 1);
  return bps / (units[toUnit] || 1);
};

// 4. DNS Lookup (Using Cloudflare 1.1.1.1 JSON API as example)
export const lookupDNS = async (domain: string, type: string = 'A') => {
  try {
    const res = await fetch(`https://cloudflare-dns.com/query?name=${domain}&type=${type}`, {
      headers: { 'Accept': 'application/dns-json' }
    });
    return await res.json();
  } catch (e) { return null; }
};

export const copyToClipboard = (text: string) => {
  if (text) navigator.clipboard.writeText(text);
};

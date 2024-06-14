export function formatAddress(address: string) {
    if (!address) {
      return ""; // If the address is undefined, return an empty string
    }
    if (address.length <= 12) {
      return address; // If the address is shorter than 12 characters, return it as is
    } else {
      const prefix = address.slice(0, 6); // Get the first six characters
      const suffix = address.slice(-6); // Get the last six characters
      return `${prefix}...${suffix}`; // Combine the first six, ..., and last six characters
    }
  }

export function loadJsonFromCID(CID: string, handler: any) {
  fetch(`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${CID}`)
    .then((response) => response.json())
    .then((json) => handler(json));
}
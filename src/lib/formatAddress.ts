export const formatAddress = (address: string | undefined, left: number, right: number) => {
    if (!address) return '';
    return `${address.slice(0, left)}...${address.slice(-right)}`;
};
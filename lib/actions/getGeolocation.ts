"use server"

async function getGeolocation(ipAddress: string, apiKey: string) {
    const apiUrl = `https://ipinfo.io/${ipAddress}?token=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.country;
}

export default getGeolocation;
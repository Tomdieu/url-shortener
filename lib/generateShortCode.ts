

export function generateShortCode() {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
const randomNumber = Math.floor(Math.random() * (11 - 4 + 1)) + 4;

    for (let i = 0; i < randomNumber; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

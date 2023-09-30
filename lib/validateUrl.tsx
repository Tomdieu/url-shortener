export function validateUrl(url: string): boolean {
    const regex = /^(?!.*(?:localhost|127\.0\.0\.1))(?:(?:https?|ftp):\/\/)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*$/;
    return regex.test(url);
}
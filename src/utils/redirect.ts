export default function redirect(url: string, timeout: number = 1) {
    return setTimeout(() => {
        window.location.href = url
    }, timeout);
}
export async function fetchJson(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        return null;
    }
}
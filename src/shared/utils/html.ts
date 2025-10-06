export const extractChildrenFromTag = (html: string, tag: string) => {
    const regex = new RegExp(`<${tag}[^>]*>(.*?)<\/${tag}>`, 's');
    const match = html.match(regex);
    return match ? match[1] : html;
}
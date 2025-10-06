import { installTheme, switchTheme } from "../api";

export const installThemeMutationOptions = () => {
    return {
        mutationFn: (themeSlug: string) => {
            return installTheme(themeSlug)
        }
    }
}

export const switchThemeMutationOptions = () => {
    return {
        mutationFn: (themeSlug: string) => {
            return switchTheme(themeSlug)
        }
    }
}

/**
 * @desc Make a sring Capitalize
 * @param str : string
 * @returns Capitalized String : string
 */
export const capitalize = (str : string) : string => {
    return str  
        .split(" ")
        .map(word => `${word[0].toUpperCase()}${word.substring(1)}`)
        .join(" ");
}

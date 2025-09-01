export const validateCity = (city) => {
    if (!city || city.trim() === "") {
        return "Ange stad";
    } 

    return null;
}
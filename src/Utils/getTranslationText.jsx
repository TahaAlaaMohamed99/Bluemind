import Resources from "../ConfigData/Resources.json";

const getTranslationText = ({ page, title, lang }) => {
    const resolvePath = (object, pathArray) => {
        return pathArray.reduce((acc, key) => {
            return acc && acc[key] !== undefined ? acc[key] : undefined;
        }, object);
    };

    const path = page ? [page, title] : [title];

    const translatedText = resolvePath(Resources, path)?.[lang] || title;

    return translatedText;
};

export default getTranslationText;

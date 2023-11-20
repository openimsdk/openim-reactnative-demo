
type ContactItem = {
    [key: string]: any;
};

export const groupContactsByFirstCharacter = <T extends ContactItem>(
    contacts: T[],
    nameProperty: keyof T
): { title: string; data: T[] }[] => {
    const grouped: { [key: string]: T[] } = {};
    let hasNonAlphabet = false;

    contacts.forEach(contact => {
        let firstChar = String(contact[nameProperty]).charAt(0).toUpperCase();

        if (!firstChar.match(/[A-Z]/)) {
            firstChar = '#';
            hasNonAlphabet = true;
        }

        if (!grouped[firstChar]) {
            grouped[firstChar] = [];
        }
        grouped[firstChar].push(contact);
    });

    const sections = Object.keys(grouped).map(key => ({
        title: key,
        data: grouped[key],
    }));

    sections.sort((a, b) => {
        if (a.title === '#') {
            return hasNonAlphabet ? 1 : -1;
        }
        if (b.title === '#') {
            return hasNonAlphabet ? -1 : 1;
        }
        return a.title.localeCompare(b.title);
    });

    return sections;
};

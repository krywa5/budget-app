// TODO: automatyczne pobieranie wersji językowej w utilsach, a nie w komponentach

export const formatCurrency = (value, lang = 'en') => {
    const number = Number(value);

    const currency = (() => {
        switch (lang) {
            case 'pl':
                return 'PLN'

            default:
                return 'USD'
        }
    })();

    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(number)
};

export const formatDate = (dateString, lang = 'en') => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat(lang).format(date);
}
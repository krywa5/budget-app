export const formatCurrency = (value, lang = 'pl') => {
    const number = Number(value);

    const currency = (() => {
        switch (lang) {
            case 'en':
                return 'USD'

            default:
                return 'PLN'
        }
    })();

    return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(number)
};
import {
    ALL_CATEGORIES_GET,
} from 'data/constants';

import API from 'data/fetch';

export const fetchAllCategories = () => {
    const promise = API.common.fetchAllCategories(null);

    return {
        type: ALL_CATEGORIES_GET,
        promise,
    }
}

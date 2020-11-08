import { QueryCache } from 'react-query';

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            suspense: true,
        },
    },
})

export default queryCache;
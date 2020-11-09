import { QueryCache } from 'react-query';

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            suspense: true,
            refetchOnWindowFocus: false,
        },
    },
})

export default queryCache;
import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'b75om320',
    dataset: 'production',
    apiVersion: 'v1',
    token: 'sk2CNYpJCa38oMjkr7LKCh0osha6G8RuXIoPcgLwi3NaKlmIyBOHDKElYmyfH9TQMGs2u6YsNfcpd0n8uUz9RCRQPThgUSKCsHf1W0QrwaRSCHzTRQZBtLAk7tf8mXAfCqSYdWNRkVQraZGHLt4KTOSj8FniQA9JJxUR0QKjudWTluBPSlBo',
    useCdn: false
})


const _config = {
    PORT :process.env.PORT,
    MONGODB_URL :process.env.MONGODB_URI
}

export const config = Object.freeze(_config);
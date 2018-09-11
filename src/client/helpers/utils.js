const isProd = function() {
    return (process.env.NODE_ENV === 'production') ? true : false;
}

export default {
    isProd
}
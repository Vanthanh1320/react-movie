const apiConfig={
    baseURL:'https://api.themoviedb.org/3/',
    apiKey:'35c1ce43e8902b78dcaf56b6634c0827',
    originalImage:(imgPath) =>`https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image:(imgPath) =>`https://image.tmdb.org/t/p/w500/${imgPath}`,

}

export default apiConfig;
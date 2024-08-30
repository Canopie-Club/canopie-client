export const cacheTest = defineCachedFunction(async (path: string) => {
    const randomNumber = Math.floor(Math.random() * 100);
    console.log(`Caching ${randomNumber} for ${path}`);
    return randomNumber;
  }, {
    maxAge: 60, // 1 minute
    name: 'cacheTest',
    getKey: (path: string) => path
  })
  
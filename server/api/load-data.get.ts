export default defineEventHandler(async (event) => {
    const result = await runTask('db:replace');
	return result
})
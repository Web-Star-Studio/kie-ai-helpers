// ESM
import Fastify from 'fastify'

const url = 'https://api.kie.ai/api/v1/veo/generate';
const options = {
    method: 'POST',
    headers: { Authorization: 'Bearer 951ffd42c12f18d6315a1b77e688ef7b', 'Content-Type': 'application/json' },
};


const fastify = Fastify({
    logger: true
})

fastify.get('/', async (request, reply) => {
    return reply.send('Hello World!')
})

fastify.post('/generate', async (request, reply) => {
    try {
        const { body: { prompt, model = 'veo3_fast' } } = request as any;
        const response = await fetch(url, { ...options, body: JSON.stringify({ "prompt": prompt, "model": model }) });
        const data = await response.json();
        return reply.send(data);
    } catch (error) {
        console.error(error);
        return reply.send(error);
    }
})

/**
 * Run the server!
 */
const start = async () => {
    try {
        await fastify.listen({ port: Number(process.env.PORT) || 3000, host: '::' })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
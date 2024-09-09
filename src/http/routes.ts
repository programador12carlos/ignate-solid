import { FastifyInstance } from 'fastify'
import { register } from '../http/controllers/register.controllers'
import { autentificdor } from './controllers/autentificar'

export async function appRoute(app: FastifyInstance) {
  await app.post('/users', register)
  await app.post('/auth', autentificdor)
}

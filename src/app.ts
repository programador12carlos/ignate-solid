import fastify from 'fastify'
import { appRoute } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { VerificarEmailUsuario } from './services/erros/erro-email'
import { VerificarAuth } from './services/erros/erroauth'
export const app = fastify()

app.register(appRoute)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro ao validar erros', issues: error.format() })
  }
  if (env.NODE_ENV === 'production') {
    console.error(error)
  }
  if (error instanceof VerificarEmailUsuario) {
    return reply.status(409).send({ message: 'E-mail já está em uso.' })
  }
  if (error instanceof VerificarAuth) {
    return reply.status(400).send({ message: 'Verifica senha ou email.' })
  }
  return reply.status(500).send({ message: 'Erro interno do servidor.' })
})

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { Auth } from '@/services/auth'
import { Operacao_no_Banco } from '@/repositories/prisma-create-repositories'

export async function autentificdor(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authusershema = z.object({
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  })

  const { email, password } = authusershema.parse(request.body)

  const operacao_no_baco = new Operacao_no_Banco()
  const authentication = new Auth(operacao_no_baco)

  await authentication.execute({
    email,
    password,
  })
  return reply.status(200).send()
}

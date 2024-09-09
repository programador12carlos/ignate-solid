import { FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeregisterservice } from '@/services/factories/make-register-sevices'

export async function register(request: FastifyRequest) {
  const usershema = z.object({
    name: z.string().min(1, 'O nome é obrigatório.'),
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
  })

  const { name, email, password } = usershema.parse(request.body)
  const registrarservice = makeregisterservice()
  await registrarservice.execute({
    name,
    email,
    password,
  })
}

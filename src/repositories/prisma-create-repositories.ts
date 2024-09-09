import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FuncoesDoRepositorio } from './uso-repositorio'

export class Operacao_no_Banco implements FuncoesDoRepositorio {
  async procurarIdUsuario(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async procurarGmailUsuario(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async criar(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }
}

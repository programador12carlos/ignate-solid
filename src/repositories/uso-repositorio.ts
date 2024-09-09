import { Prisma, User } from '@prisma/client'

export interface FuncoesDoRepositorio {
  procurarGmailUsuario(email: string): Promise<User | null>
  procurarIdUsuario(id: string): Promise<User | null>

  criar(data: Prisma.UserCreateInput): Promise<User>
}

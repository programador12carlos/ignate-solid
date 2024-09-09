import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import { User } from '@prisma/client'
import { ResouresError } from './erros/resoures-error-user'

interface GetUserRequest {
  userId: string
}
interface GetUserResponse {
  user: User
}

export class GetId {
  constructor(private funcosrepositorio: FuncoesDoRepositorio) {}
  async execute({ userId }: GetUserRequest): Promise<GetUserResponse> {
    const user = await this.funcosrepositorio.procurarIdUsuario(userId)
    if (!user) {
      throw new ResouresError()
    }
    return { user }
  }
}

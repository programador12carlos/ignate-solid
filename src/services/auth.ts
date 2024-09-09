import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import { VerificarAuth } from './erros/erroauth'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticatorRequest {
  email: string
  password: string
}
interface AuthenticatorResponse {
  user: User
}

export class Auth {
  constructor(private funcosrepositorio: FuncoesDoRepositorio) {}
  async execute({
    email,
    password,
  }: AuthenticatorRequest): Promise<AuthenticatorResponse> {
    const user = await this.funcosrepositorio.procurarGmailUsuario(email)
    if (!user) {
      throw new VerificarAuth()
    }
    const doespasswordhas = await bcrypt.compare(password, user.password_has)
    if (!doespasswordhas) {
      throw new VerificarAuth()
    }
    return { user }
  }
}

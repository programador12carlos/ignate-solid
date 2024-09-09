import { FuncoesDoRepositorio } from '@/repositories/uso-repositorio'
import bcrypt from 'bcryptjs'
import { VerificarEmailUsuario } from './erros/erro-email'
import { User } from '@prisma/client'

interface UserRequest {
  name: string
  email: string
  password: string
}
interface UserResponse {
  usuario: User
}
export class RegistarUserCase {
  constructor(private funcoesdorepositorio: FuncoesDoRepositorio) {}

  async execute({ name, email, password }: UserRequest): Promise<UserResponse> {
    const password_hash = await bcrypt.hash(password, 6)
    const userEmail =
      await this.funcoesdorepositorio.procurarGmailUsuario(email)

    if (userEmail) {
      throw new VerificarEmailUsuario()
    }
    const usuario = await this.funcoesdorepositorio.criar({
      name,
      email,
      password_has: password_hash,
    })
    return {
      usuario,
    }
  }
}

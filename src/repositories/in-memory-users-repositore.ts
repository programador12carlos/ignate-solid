import { User, Prisma } from '@prisma/client'
import { FuncoesDoRepositorio } from './uso-repositorio'

export class InMemoryUserRepository implements FuncoesDoRepositorio {
  public items: User[] = []

  async procurarIdUsuario(id: string) {
    const user = this.items.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async procurarGmailUsuario(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }
    return user
  }

  async criar(data: Prisma.UserCreateInput) {
    const user = {
      id: 'carlos -1',
      name: data.name,
      email: data.email,
      password_has: data.password_has,
      create_at: new Date(),
    }
    this.items.push(user)
    return user
  }
}

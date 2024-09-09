import { Gin } from '@prisma/client'
import { FuncoesDoRepositorioGym } from './uso-repositories-gyn'

export class InMemoryGinRepository implements FuncoesDoRepositorioGym {
  public items: Gin[] = []

  ProcurarId(id: string): Promise<Gin | null> {
    const procurarid = this.items.find((item) => item.id === id)

    if (!procurarid) {
      // Retorna null encapsulado em uma Promise
      return Promise.resolve(null)
    }

    // Retorna o item encontrado também encapsulado em uma Promise
    return Promise.resolve(procurarid)
  }
}

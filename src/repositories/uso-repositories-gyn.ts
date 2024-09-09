import { Gin } from '@prisma/client'

export interface FuncoesDoRepositorioGym {
  ProcurarId(id: string): Promise<Gin | null>
}

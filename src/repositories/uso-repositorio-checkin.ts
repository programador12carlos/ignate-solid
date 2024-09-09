import { Prisma, Checkin } from '@prisma/client'

export interface FuncoesDoRepositorioCheckin {
  procurarDataCheckinUser(userId: string, data: Date): Promise<Checkin | null>
  criar(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
}

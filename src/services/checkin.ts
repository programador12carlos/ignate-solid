// src/services/checkin.ts
import { FuncoesDoRepositorioGym } from '@/repositories/uso-repositories-gyn'
import { FuncoesDoRepositorioCheckin } from '@/repositories/uso-repositorio-checkin'
import { Checkin } from '@prisma/client'
import { ResouresError } from './erros/resoures-error-user'

interface CheckInRequest {
  userId: string
  ginId: string
  latitude: number
  longitude: number
}

interface CheckInResponse {
  checkin: Checkin
}

export class CheckinUser {
  constructor(
    private funcosrepositorio: FuncoesDoRepositorioCheckin,
    private funcoesdorepositorioGyn: FuncoesDoRepositorioGym,
  ) {}

  async execute({ userId, ginId }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.funcoesdorepositorioGyn.ProcurarId(ginId)
    if (!gym) {
      throw new ResouresError()
    }

    const procurarcheckinuser =
      await this.funcosrepositorio.procurarDataCheckinUser(userId, new Date())

    if (procurarcheckinuser) {
      throw new Error('O usuário já fez check-in hoje.')
    }

    const checkin = await this.funcosrepositorio.criar({
      user_id: userId,
      gin_id: ginId,
    })

    return { checkin }
  }
}

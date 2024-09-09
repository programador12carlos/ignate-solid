import { beforeEach, describe, expect, it, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '../repositories/in-memory-checkin-repositore'
import { CheckinUser } from './checkin'
import { InMemoryGinRepository } from '@/repositories/in-memory-gin-repository'
import { Decimal } from '@prisma/client/runtime/library'

let BancoDeDados: InMemoryCheckInRepository
let BancoDeDadosGyn: InMemoryGinRepository
let sut: CheckinUser

describe('testando o checkin', () => {
  beforeEach(() => {
    BancoDeDados = new InMemoryCheckInRepository()
    BancoDeDadosGyn = new InMemoryGinRepository()
    sut = new CheckinUser(BancoDeDados, BancoDeDadosGyn)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('DEVE SER POSSIVEL FAZER CHECK IN EM UMA ACADEMIA', async () => {
    await BancoDeDadosGyn.items.push({
      id: 'gym-01',
      title: 'AcademiaSOrect',
      descricption: '',
      phone: '',
      latitule: new Decimal(0),
      longitude: new Decimal(0),
    })
    const { checkin } = await sut.execute({
      userId: 'cart_2',
      ginId: 'gym-01',
      latitude: 0,
      longitude: 0,
    })

    await expect(checkin.gin_id).toEqual(expect.any(String))
  })

  it('O USUARIO NAO DEVE SE INCREVER EM DUAS VEZES', async () => {
    await BancoDeDadosGyn.items.push({
      id: 'gym-01',
      title: 'AcademiaSOrect',
      descricption: '',
      phone: '',
      latitule: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.setSystemTime(new Date(2022, 0, 20, 0, 0))
    await sut.execute({
      userId: 'user-01',
      ginId: 'gym-01',
      latitude: 0,
      longitude: 0,
    })
    await expect(() =>
      sut.execute({
        userId: 'user-01',
        ginId: 'gym-041',
        latitude: 0,
        longitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
it(' NAO DEVERIA SER POSSIVEL FAZER CHECK IN EM UMA ACADEMIA DISTANTE', async () => {
  await BancoDeDadosGyn.items.push({
    id: 'gym-01',
    title: 'AcademiaSOrect',
    descricption: '',
    phone: '',
    latitule: new Decimal(-8.92421405),
    longitude: new Decimal(13.186151933726588),
  })

  await expect(() =>
    sut.execute({
      userId: 'cart_2',
      ginId: 'gym-02',
      latitude: -8.9222819,
      longitude: 13.275625,
    }),
  ).rejects.toBeInstanceOf(Error)
})

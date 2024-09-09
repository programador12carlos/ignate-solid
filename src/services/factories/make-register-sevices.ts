import { Operacao_no_Banco } from '@/repositories/prisma-create-repositories'
import { RegistarUserCase } from '../register'

export function makeregisterservice() {
  const operacao_no_baco = new Operacao_no_Banco()
  const registerUseCase = new RegistarUserCase(operacao_no_baco)
  return registerUseCase
}

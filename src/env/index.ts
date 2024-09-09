import { z } from 'zod'
import 'dotenv/config'

const envshima = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _variable = envshima.safeParse(process.env)

if (_variable.success === false) {
  console.error('variavel invalidas', _variable.error.format())
  throw new Error('erros nas variaveis de ambiente')
}
export const env = _variable.data

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Teste de Integração com o Banco de Dados', () => {
  // Isso garante que o Prisma feche a conexão após o teste
  afterAll(async () => {
    await prisma.$disconnect().catch(() => {});
  })

  it('deve verificar se o banco está acessível e encontrar o gestor', async () => {
    const usuario = await prisma.usuario.findUnique({
      where: { login: 'admin' },
    })

    expect(usuario).toBeDefined()
    expect(usuario?.nome).toContain('Cássio')
  })
})

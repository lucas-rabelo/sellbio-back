# Feature Pattern — Sellbio Backend

> Arquivo de padrão fixo. Referenciado pelo prompt de criação de feature.
> Não edite sem atualizar CONVENTIONS.md junto.

---

## Ordem de geração de arquivos

1. `src/modules/app/{feature}/application/entities/{entity}/types.ts`
2. `src/modules/app/{feature}/application/entities/{entity}/{entity}.ts`
3. `src/modules/app/{feature}/application/entities/{entity}/{entity}.spec.ts`
4. `src/modules/app/{feature}/dtos/{action}.dto.ts` — um por ação
5. `src/infra/database/entities/{feature}.entity.ts`
6. `src/modules/app/{feature}/infra/http/database/{feature}.repository.ts`
7. `src/modules/app/{feature}/infra/http/database/typeorm/mappers/{feature}.mapper.ts`
8. `src/modules/app/{feature}/infra/http/database/typeorm/repositories/{feature}-repository.typeorm.ts`
9. `test/repositories/in-memory-{feature}-repository.ts`
10. Para cada ação:
    - `application/use-cases/{action}/types.ts`
    - `application/use-cases/{action}/{action}-{feature}.use-case.ts`
    - `application/use-cases/{action}/{action}-{feature}.use-case.spec.ts`
11. `application/services/find-by-name/find-by-name-{feature}.service.ts` (se necessário)
12. `infra/http/controllers/{action}-{feature}.controller.ts` — um por ação
13. `{feature}.module.ts`

---

## Padrões obrigatórios

- **Entidade**: propriedades privadas, getters explícitos, setters com validação + `markAsUpdated()`
- **Use case**: método `execute()`, injeção via Symbol, sem lógica no controller
- **Testes**: padrão AAA, `InMemoryRepository` (nunca `jest.mock()`), `.spec.ts` obrigatório por use-case
- **DTOs**: schema Zod + `createZodDto()`, 1 por ação, exportar schema e classe
- **Exceções**: `BadRequestException` / `NotFoundException` com contexto `CONTEXT_{FEATURE}.{ACTION}`
- Adicionar `CONTEXT_{FEATURE}` em `src/core/constants/enum.ts`

---

## Referência de implementação completa

`src/modules/app/users/` — módulo com 7 use-cases, repositório, mappers e testes

# Sellbio Backend — Conventions

Guia de referência para o time de desenvolvimento. Explica **o quê**, **por quê** e **como** os padrões são aplicados neste projeto.

**Stack**: NestJS 11 · TypeORM · PostgreSQL 15 · Zod · Jest · Docker Compose

---

## Índice

1. [Arquitetura Hexagonal](#1-arquitetura-hexagonal)
2. [Estrutura de Módulos](#2-estrutura-de-módulos)
3. [Entidades de Domínio](#3-entidades-de-domínio)
4. [Use Cases](#4-use-cases)
5. [Services](#5-services)
6. [DTOs com Zod](#6-dtos-com-zod)
7. [Repositórios](#7-repositórios)
8. [Mappers](#8-mappers)
9. [Controllers](#9-controllers)
10. [Testes](#10-testes)
11. [Tratamento de Erros](#11-tratamento-de-erros)
12. [TypeORM Entities](#12-typeorm-entities)
13. [Módulo e Injeção de Dependências](#13-módulo-e-injeção-de-dependências)
14. [Docker & Environment](#14-docker--environment)
15. [Princípios SOLID no Projeto](#15-princípios-solid-no-projeto)
16. [Checklist: Criar Nova Feature](#16-checklist-criar-nova-feature)
17. [Comandos](#17-comandos)

---

## 1. Arquitetura Hexagonal

O projeto usa **arquitetura hexagonal** (ports & adapters). A ideia central é isolar a lógica de negócio (domínio) de detalhes de infraestrutura (banco de dados, HTTP, frameworks).

```
┌─────────────────────────────────────────┐
│              HTTP / Controllers          │  ← Adaptadores de entrada
├─────────────────────────────────────────┤
│           Use Cases / Services           │  ← Lógica de negócio
├─────────────────────────────────────────┤
│          Entities (Domain)               │  ← Regras de domínio
├─────────────────────────────────────────┤
│     Repository Interface (Port)          │  ← Contrato abstrato
├─────────────────────────────────────────┤
│    TypeORM Repository (Adapter)          │  ← Implementação de infra
└─────────────────────────────────────────┘
```

**Por quê?** A lógica de negócio não depende do NestJS, TypeORM ou PostgreSQL. Isso permite trocar de banco, testar sem banco real e manter o domínio coeso.

---

## 2. Estrutura de Módulos

Cada feature em `src/modules/app/{feature}/`:

```
{feature}/
├── application/
│   ├── use-cases/
│   │   └── {action}/
│   │       ├── {action}-{feature}.use-case.ts
│   │       ├── {action}-{feature}.use-case.spec.ts   ← obrigatório
│   │       └── types.ts                              ← obrigatório
│   ├── services/
│   │   └── {service-name}/
│   │       ├── {service-name}.service.ts
│   │       ├── {service-name}.service.spec.ts
│   │       └── types.ts
│   └── entities/
│       └── {entity}/
│           ├── {entity}.ts
│           ├── {entity}.spec.ts
│           └── types.ts
├── dtos/
│   └── {action}.dto.ts
├── infra/
│   └── http/
│       ├── controllers/
│       │   └── {action}-{feature}.controller.ts
│       └── database/
│           ├── {feature}.repository.ts          ← interface abstrata
│           └── typeorm/
│               ├── repositories/
│               │   └── {feature}-repository.typeorm.ts
│               └── mappers/
│                   └── {feature}.mapper.ts
└── {feature}.module.ts
```

**Referência**: `src/modules/app/users/` — módulo completo com 7 use-cases.

---

## 3. Entidades de Domínio

Entidades encapsulam **regras de negócio**, não são apenas estruturas de dados.

### Organização

```
entities/{entity}/
├── {entity}.ts       ← classe com getters, setters validados e comportamentos
├── {entity}.spec.ts  ← testes de comportamento
└── types.ts          ← interfaces de props
```

### types.ts

```typescript
// entities/product/types.ts
export interface ProductProps {
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

// Campos opcionais na construção (têm defaults)
export interface ProductReplaceProps {
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}
```

### Implementação da Entidade

```typescript
// entities/product/product.ts
import { randomUUID } from 'crypto';
import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CONTEXT_PRODUCT } from '@/src/core/constants/enum';
import { ProductProps, ProductReplaceProps } from './types';

export class Product {
  private _uuid: string;
  private props: ProductProps;

  constructor(props: Replace<ProductProps, ProductReplaceProps>, uuid?: string) {
    this._uuid = uuid ?? randomUUID();
    this.props = {
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ? new Date(props.createdAt) : new Date(),
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : null,
      deletedAt: props.deletedAt ? new Date(props.deletedAt) : null,
    };
    this.validate();
  }

  // ===== GETTERS =====
  getUuid(): string { return this._uuid; }
  getName(): string { return this.props.name; }
  getPrice(): number { return this.props.price; }
  getStock(): number { return this.props.stock; }
  getIsActive(): boolean { return this.props.isActive; }
  getCreatedAt(): Date { return this.props.createdAt; }
  getUpdatedAt(): Date | null { return this.props.updatedAt; }
  isDeleted(): boolean { return !!this.props.deletedAt; }

  // ===== SETTERS COM VALIDAÇÃO =====
  changeName(newName: string): void {
    if (!newName?.trim()) {
      throw new BadRequestException(CONTEXT_PRODUCT.UPDATE, 'Product name cannot be empty');
    }
    this.props.name = newName;
    this.markAsUpdated();
  }

  changePrice(newPrice: number): void {
    if (newPrice <= 0) {
      throw new BadRequestException(CONTEXT_PRODUCT.UPDATE, 'Price must be greater than 0');
    }
    this.props.price = newPrice;
    this.markAsUpdated();
  }

  adjustStock(quantity: number): void {
    const newStock = this.props.stock + quantity;
    if (newStock < 0) {
      throw new BadRequestException(CONTEXT_PRODUCT.UPDATE, 'Stock cannot be negative');
    }
    this.props.stock = newStock;
    this.markAsUpdated();
  }

  // ===== COMPORTAMENTOS =====
  activate(): void {
    if (this.props.isActive) {
      throw new BadRequestException(CONTEXT_PRODUCT.UPDATE, 'Product is already active');
    }
    this.props.isActive = true;
    this.markAsUpdated();
  }

  deactivate(): void {
    if (!this.props.isActive) {
      throw new BadRequestException(CONTEXT_PRODUCT.UPDATE, 'Product is already inactive');
    }
    this.props.isActive = false;
    this.markAsUpdated();
  }

  delete(): void {
    this.props.deletedAt = new Date();
    this.markAsUpdated();
  }

  restore(): void {
    this.props.deletedAt = null;
    this.markAsUpdated();
  }

  isAvailable(): boolean {
    return this.props.isActive && this.props.stock > 0 && !this.isDeleted();
  }

  canBePurchased(quantity: number): boolean {
    return this.isAvailable() && this.props.stock >= quantity;
  }

  // ===== HELPERS PRIVADOS =====
  private validate(): void {
    if (!this.props.name?.trim()) throw new Error('Product name is required');
    if (this.props.price <= 0) throw new Error('Price must be greater than 0');
    if (this.props.stock < 0) throw new Error('Stock cannot be negative');
  }

  private markAsUpdated(): void {
    this.props.updatedAt = new Date();
  }
}
```

**Por quê getters em vez de propriedades públicas?** Para manter encapsulamento — o estado interno só muda por métodos validados, nunca por atribuição direta.

---

## 4. Use Cases

Um use-case = uma ação de negócio. Responsabilidade única: orquestrar services, repositórios e entidades para realizar **uma operação**.

### Estrutura

```typescript
// application/use-cases/create/create-product.use-case.ts
import { Injectable } from '@nestjs/common';
import { ProductsRepository, IProductRepository } from '../../infra/http/database/products.repository';
import { FindByNameProductService } from '../../application/services/find-by-name/find-by-name-product.service';
import { Product } from '../../application/entities/product/product';
import { BadRequestException } from '@/src/core/exceptions/bad-request.exception';
import { CONTEXT_PRODUCT } from '@/src/core/constants/enum';
import type { CreateProductRequestProps, CreateProductResponseProps } from './types';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(ProductsRepository) private repository: IProductRepository,
    private findByNameService: FindByNameProductService,
  ) {}

  async execute(data: CreateProductRequestProps): Promise<CreateProductResponseProps> {
    // 1. Validações de negócio
    const exists = await this.findByNameService.execute(data.name);
    if (exists) {
      throw new BadRequestException(CONTEXT_PRODUCT.CREATE, 'Product name already exists');
    }

    // 2. Criar entidade de domínio
    const product = new Product({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
    });

    // 3. Persistir via repositório
    const created = await this.repository.create(product);

    // 4. Retornar response
    return new CreateProductResponseDto(created);
  }
}
```

### types.ts (ao lado do use-case)

```typescript
// application/use-cases/create/types.ts
import { z } from 'zod';
import { createProductRequestSchema, createProductResponseSchema } from '../../dtos/create-product.dto';

export type CreateProductRequestProps = z.infer<typeof createProductRequestSchema>;
export type CreateProductResponseProps = z.infer<typeof createProductResponseSchema>;
```

---

## 5. Services

Services encapsulam **lógica reutilizada por múltiplos use-cases**. Não são obrigatórios para toda feature — crie apenas quando há reutilização real.

```typescript
// application/services/find-by-name/find-by-name-product.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository, IProductRepository } from '../../infra/http/database/products.repository';
import { Product } from '../../application/entities/product/product';

@Injectable()
export class FindByNameProductService {
  constructor(
    @Inject(ProductsRepository) private repository: IProductRepository,
  ) {}

  async execute(name: string): Promise<Product | null> {
    return this.repository.findByName(name);
  }
}
```

---

## 6. DTOs com Zod

DTOs definem o contrato da API: o que entra e o que sai.

### Por quê Zod?
- Validação em runtime + tipagem TypeScript a partir do mesmo schema
- `nestjs-zod` integra com o pipe global automaticamente
- Mensagens de erro customizadas e composição de schemas

### Estrutura

```typescript
// dtos/create-product.dto.ts
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const createProductRequestSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must have at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  stock: z.number().nonnegative('Stock cannot be negative'),
});

const createProductResponseSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
});

class CreateProductRequestDto extends createZodDto(createProductRequestSchema) {}
class CreateProductResponseDto extends createZodDto(createProductResponseSchema) {}

export {
  CreateProductRequestDto,
  createProductRequestSchema,
  CreateProductResponseDto,
  createProductResponseSchema,
};
```

**Regra**: 1 arquivo por ação, nunca compartilhar DTOs entre actions diferentes.

---

## 7. Repositórios

O repositório isola o domínio do banco de dados. A interface define o **contrato**; a implementação TypeORM é um detalhe.

### Interface (port)

```typescript
// infra/http/database/products.repository.ts
import { Product } from '../../application/entities/product/product';

export const ProductsRepository = Symbol('ProductsRepository');

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findByUuid(uuid: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  list(skip: number, take: number): Promise<{ data: Product[]; total: number }>;
  save(product: Product): Promise<Product>;
  delete(uuid: string): Promise<void>;
}
```

### Implementação TypeORM

```typescript
// infra/http/database/typeorm/repositories/products-repository.typeorm.ts
@Injectable()
export class ProductsRepositoryTypeOrm implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private repository: Repository<ProductEntity>,
  ) {}

  async create(product: Product): Promise<Product> {
    const entity = ProductsMapper.toTypeOrm(product);
    const saved = await this.repository.save(entity);
    return ProductsMapper.toDomain(saved);
  }

  async findByUuid(uuid: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { uuid } });
    return entity ? ProductsMapper.toDomain(entity) : null;
  }

  async findByName(name: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { name } });
    return entity ? ProductsMapper.toDomain(entity) : null;
  }

  async list(skip: number, take: number): Promise<{ data: Product[]; total: number }> {
    const [entities, total] = await this.repository.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
    return { data: entities.map(ProductsMapper.toDomain), total };
  }

  async save(product: Product): Promise<Product> {
    const entity = ProductsMapper.toTypeOrm(product);
    const saved = await this.repository.save(entity);
    return ProductsMapper.toDomain(saved);
  }

  async delete(uuid: string): Promise<void> {
    await this.repository.softDelete({ uuid });
  }
}
```

---

## 8. Mappers

Responsáveis pela tradução entre camadas: domínio ↔ ORM ↔ DTO.

```typescript
// infra/http/database/typeorm/mappers/products.mapper.ts
import { Product } from '@/src/modules/app/products/application/entities/product/product';
import { ProductEntity } from '@/src/infra/database/entities/product.entity';

export class ProductsMapper {
  static toTypeOrm(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.uuid = product.getUuid();
    entity.name = product.getName();
    entity.description = product.getDescription();
    entity.price = product.getPrice();
    entity.stock = product.getStock();
    entity.isActive = product.getIsActive();
    return entity;
  }

  static toDomain(entity: ProductEntity): Product {
    return new Product(
      {
        name: entity.name,
        description: entity.description,
        price: entity.price,
        stock: entity.stock,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      },
      entity.uuid,
    );
  }
}
```

---

## 9. Controllers

Controllers são adaptadores de entrada: recebem HTTP, delegam ao use-case, retornam a resposta.

```typescript
// infra/http/controllers/create-product.controller.ts
import { Body } from '@nestjs/common';
import { AppController, AppPost } from '@/src/infra/decorators';
import { CreateProductUseCase } from '../../application/use-cases/create/create-product.use-case';
import { CreateProductRequestDto, CreateProductResponseDto } from '../../dtos/create-product.dto';

@AppController('Products')
export class CreateProductController {
  constructor(private readonly useCase: CreateProductUseCase) {}

  @AppPost({
    summary: 'Create a new product',
    body: CreateProductRequestDto,
    okResponse: CreateProductResponseDto,
  })
  async handle(@Body() body: CreateProductRequestDto) {
    return this.useCase.execute(body);
  }
}
```

**Regra**: nenhuma lógica de negócio no controller. Se há um `if` aqui, mova para o use-case.

### Decorators disponíveis

| Decorator | Uso |
|---|---|
| `@AppController(name)` | ApiTags + bad request docs |
| `@AppPost({...})` | POST + Swagger docs |
| `@AppGet()` / `@AppPatch()` / `@AppPut()` / `@AppDelete()` | Idem para outros verbos |
| `@Public()` | Rota sem autenticação |
| `@User()` | Extrai usuário do JWT |

---

## 10. Testes

### Filosofia

- **Unitários**: isolam a lógica de uma classe usando `InMemoryRepository`
- **E2E**: testam o fluxo HTTP completo com banco real (`.env.test`)
- **Sem `jest.mock()` em repositórios**: `InMemoryRepository` é mais fiel ao comportamento real e detecta bugs de lógica que mocks escondem

### Padrão AAA (obrigatório em todos os `it()`)

```typescript
it('should create a product successfully', async () => {
  // Arrange
  const input: CreateProductRequestDto = {
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1500,
    stock: 10,
  };

  // Act
  const result = await useCase.execute(input);

  // Assert
  expect(result.uuid).toBeDefined();
  expect(result.name).toBe('Laptop');
});
```

### InMemoryRepository

```typescript
// test/repositories/in-memory-product-repository.ts
export class InMemoryProductRepository implements IProductRepository {
  private items: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.items.push(product);
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    return this.items.find(p => p.getName() === name) ?? null;
  }

  async findByUuid(uuid: string): Promise<Product | null> {
    return this.items.find(p => p.getUuid() === uuid) ?? null;
  }

  async list(skip: number, take: number): Promise<{ data: Product[]; total: number }> {
    const data = this.items.slice(skip, skip + take);
    return { data, total: this.items.length };
  }

  async save(product: Product): Promise<Product> {
    const index = this.items.findIndex(p => p.getUuid() === product.getUuid());
    if (index >= 0) this.items[index] = product;
    return product;
  }

  async delete(uuid: string): Promise<void> {
    const product = await this.findByUuid(uuid);
    product?.delete();
  }
}
```

### Setup de Use Case Test

```typescript
describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
    const findByNameService = new FindByNameProductService(repository);
    useCase = new CreateProductUseCase(repository, findByNameService);
  });

  // it(...)
});
```

---

## 11. Tratamento de Erros

### Hierarquia

```
ApplicationException (base)
├── BadRequestException   → HTTP 400
└── NotFoundException     → HTTP 404
```

### Uso

```typescript
// Contexto rastreável + mensagem legível
throw new BadRequestException(CONTEXT_PRODUCT.CREATE, 'Product name already exists');
throw new NotFoundException(CONTEXT_PRODUCT.READ, 'Product not found');
```

- Contextos definidos em `src/core/constants/enum.ts`
- Um global filter formata a resposta automaticamente — não envolva em try/catch desnecessário

---

## 12. TypeORM Entities

Entidades TypeORM são mapeamento de banco, separadas das entidades de domínio.

```typescript
// src/infra/database/entities/product.entity.ts
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
```

**Soft delete**: use `@DeleteDateColumn()` + `softDelete()` no repositório. Nunca delete fisicamente.

---

## 13. Módulo e Injeção de Dependências

```typescript
// products.module.ts
@Module({
  imports: [DatabaseModule],
  providers: [
    // Services (instanciados antes dos use-cases)
    FindByNameProductService,

    // Use Cases
    CreateProductUseCase,
    ReadProductUseCase,
    UpdateProductUseCase,

    // Repository: mapeia o Symbol para a implementação real
    { provide: ProductsRepository, useClass: ProductsRepositoryTypeOrm },
  ],
  controllers: [
    CreateProductController,
    ReadProductController,
    UpdateProductController,
  ],
})
export class ProductsModule {}
```

**Circular dependency**: use `forwardRef(() => OtherModule)` no `imports` e `forwardRef(() => OtherService)` no construtor.

---

## 14. Docker & Environment

### Serviços

| Serviço | Container | Porta | Banco | Credenciais |
|---|---|---|---|---|
| PostgreSQL 15 | `sellbio-postgres` | `5432` | `sellbio` | `postgres:postgres` |

### Comandos

```bash
# Iniciar stack
docker-compose up -d

# Ver logs do banco
docker-compose logs -f db

# Acessar PostgreSQL
docker-compose exec db psql -U postgres -d sellbio

# Parar
docker-compose down

# Limpar volumes (dados apagados)
docker-compose down -v
```

### Workflow de desenvolvimento

```bash
docker-compose up -d          # 1. Subir banco
docker-compose exec db pg_isready  # 2. Confirmar saúde
npm run migration:run         # 3. Rodar migrations
npm run start:dev             # 4. Iniciar app
npm test                      # 5. Rodar testes
```

### .env e .env.test

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=sellbio
```

> **Atenção**: Docker deve estar rodando antes de testes de integração/e2e.

---

## 15. Princípios SOLID no Projeto

| Princípio | Como se aplica |
|---|---|
| **S** Single Responsibility | 1 use-case = 1 ação; 1 service = 1 responsabilidade; controllers só delegam |
| **O** Open/Closed | Extensível via novas implementações de `IProductRepository` sem alterar use-cases |
| **L** Liskov Substitution | `InMemoryRepository` e `TypeOrmRepository` são intercambiáveis nos testes |
| **I** Interface Segregation | DTOs e repositórios específicos por ação, sem interfaces genéricas infladas |
| **D** Dependency Inversion | Use-cases dependem de `IProductRepository` (abstração), nunca de `TypeOrmRepository` (concreto) |

---

## 16. Checklist: Criar Nova Feature

```
□ 1. Criar módulo: src/modules/app/{feature}/{feature}.module.ts
□ 2. Entity com types e testes: application/entities/{entity}/
□ 3. DTOs Zod: dtos/{action}.dto.ts
□ 4. Interface do repositório + Symbol: infra/http/database/{feature}.repository.ts
□ 5. TypeORM entity: src/infra/database/entities/{feature}.entity.ts
□ 6. Mapper: infra/http/database/typeorm/mappers/{feature}.mapper.ts
□ 7. InMemoryRepository: test/repositories/in-memory-{feature}-repository.ts
□ 8. Use-cases + types.ts + .spec.ts: application/use-cases/{action}/
□ 9. Services (se lógica compartilhada): application/services/{action}/
□ 10. Controllers: infra/http/controllers/{action}-{feature}.controller.ts
□ 11. Registrar no módulo: providers + controllers + repository Symbol
□ 12. Importar módulo no AppModule (ou parent module)
□ 13. Gerar e rodar migration: npm run migration:generate && migration:run
□ 14. Rodar testes: npm test
```

---

## 17. Comandos

### Build & Desenvolvimento

```bash
npm run build          # Compilar TypeScript
npm run start          # Produção
npm run start:dev      # Watch mode (desenvolvimento)
npm run start:debug    # Debug com inspect
```

### Testes

```bash
npm test               # Todos os testes unitários
npm run test:watch     # Watch mode
npm run test:cov       # Com cobertura
npm run test:e2e       # End-to-end
```

### Banco de Dados

```bash
npm run migration:generate   # Gerar migration a partir das entities
npm run migration:run        # Rodar migrations pendentes
npm run migration:revert     # Reverter última migration
```

### Qualidade de Código

```bash
npm run lint           # ESLint com auto-fix
npm run format         # Prettier
```

---

## Referências no Código

| O quê | Onde |
|---|---|
| Módulo completo (7 use-cases) | `src/modules/app/users/` |
| Auth com circular dependency | `src/modules/app/auth/` |
| Factories para testes | `test/factories/` |
| InMemory repositories | `test/repositories/` |
| Exceções customizadas | `src/core/exceptions/` |
| Decorators HTTP | `src/infra/decorators/` |
| Constantes e enums | `src/core/constants/` |

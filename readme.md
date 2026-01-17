# JC Storage SDK

SDK oficial para integração com o JC Storage - serviço de armazenamento de arquivos.

## Instalação

```bash
npm install jc-storage-sdk
```

## Configuração

Primeiro, inicialize o cliente com suas credenciais:

```typescript
import { Client } from "jc-storage-sdk";

const client = new Client({
  accessKey: "sua-access-key",
  secretKey: "sua-secret-key",
});
```

## Uso

### Upload de Arquivos

Faça upload de arquivos para um bucket específico:

```typescript
const result = await client.storage().upload({
  filePath: "/caminho/para/arquivo.jpg",
  bucket: "meu-bucket",
  filename: "nome-personalizado.jpg", // opcional - se não informado, usa o nome original do arquivo
  isPrivate: false, // opcional - padrão: false
});

console.log(result);
// {
//   file: {
//     id: "uuid-do-arquivo",
//     filename: "nome-personalizado.jpg",
//     is_private: false,
//     path: "caminho/no/storage",
//     bucket_id: "uuid-do-bucket",
//     size: 12345,
//     mime_type: "image/jpeg",
//     updated_at: "2026-01-16T00:00:00.000Z",
//     created_at: "2026-01-16T00:00:00.000Z"
//   },
//   url: "https://..." // URL pública (null se o arquivo for privado)
// }
```

### Deletar Arquivo

Remova um arquivo pelo seu ID:

```typescript
await client.storage().delete("uuid-do-arquivo");
```

### Obter URL de Arquivo Privado

Gere uma URL assinada temporária para acessar arquivos privados:

```typescript
const { url, expires_at } = await client.storage().getPrivateFileUrl("uuid-do-arquivo");

console.log(url);        // URL assinada para acesso temporário
console.log(expires_at); // Data/hora de expiração da URL
```

## Parâmetros

### UploadParams

| Parâmetro   | Tipo      | Obrigatório | Descrição                                                |
| ----------- | --------- | ----------- | -------------------------------------------------------- |
| `filePath`  | `string`  | ✅          | Caminho local do arquivo a ser enviado                   |
| `bucket`    | `string`  | ✅          | Nome do bucket de destino                                |
| `filename`  | `string`  | ❌          | Nome personalizado para o arquivo (padrão: nome original)|
| `isPrivate` | `boolean` | ❌          | Define se o arquivo é privado (padrão: `false`)          |

## Licença

MIT © JCDEV

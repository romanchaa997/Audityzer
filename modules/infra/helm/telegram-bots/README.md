# telegram-bots

Helm chart for AuditorSEC Telegram bot ecosystem (@audityzerbot, alert bots, YouTube bot).

## Install

```bash
helm install telegram-bots ./telegram-bots \
  --namespace auditorsec --create-namespace \
  --set secrets.TELEGRAM_BOT_TOKEN="your-bot-token" \
  --set secrets.RAG_API_KEY="your-rag-key"
```

## Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `replicaCount` | Number of replicas (webhook mode = 1) | `1` |
| `image.repository` | Container image | `registry.digitalocean.com/auditorsec/telegram-bots` |
| `secrets.TELEGRAM_BOT_TOKEN` | Main bot token | `""` |
| `secrets.RAG_API_KEY` | RAG API key | `""` |
| `env.RAG_API_URL` | Internal RAG API URL | `http://auditorsec-platform:80/api/rag` |
| `env.WEBHOOK_PATH` | Telegram webhook path | `/webhook/telegram` |

## Post-Install

Set the Telegram webhook after deployment:

```bash
curl -X POST "https://api.telegram.org/bot${TOKEN}/setWebhook" \
  -d '{"url": "https://bot.neuralinfra.digital/webhook/telegram"}'
```

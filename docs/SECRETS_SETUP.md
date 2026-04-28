# AuditorSEC — GitHub Secrets & Workflows Setup Guide

> **Статус**: Активний | **Оновлено**: 2026-04-28 | **Автор**: romanchaa997
> **Дедлайн Diia.City Q2**: 10.07.2026 (73 дні)

---

## Крок 1: GitHub Secrets (обов'язково перед запуском workflows)

Перейди: `Settings → Secrets and variables → Actions → New repository secret`

### Обов'язкові secrets

| Secret | Звідки отримати | Використовується в |
|--------|-----------------|--------------------|
| `TELEGRAM_BOT_TOKEN` | [@BotFather](https://t.me/BotFather) → /newbot | diia-compliance, origin-ca-monitor |
| `TELEGRAM_CHAT_ID` | [@userinfobot](https://t.me/userinfobot) або канал ID | diia-compliance, origin-ca-monitor |
| `CF_API_TOKEN` | [Cloudflare → My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) | add-audityzer-io-dns, add-dns-record |
| `CLOUDFLARE_API_TOKEN` | Те саме, з правами `Zone:SSL:Edit` | diia-compliance, origin-ca-monitor |
| `CLOUDFLARE_ZONE_ID` | Cloudflare → Dashboard → auditorsec.com → Overview (right sidebar) | Terraform, workflows |
| `CLICKUP_API_TOKEN` | [ClickUp → Settings → Apps → API Token](https://app.clickup.com/settings/apps) | diia-compliance |
| `CLICKUP_LIST_ID` | ClickUp → List URL: `app.clickup.com/.../**LIST_ID**/...` | diia-compliance |

### Як створити Telegram Bot
```
1. Відкрий Telegram → @BotFather
2. /newbot → вкажи ім'я: AuditorSEC Monitor
3. Отримай токен: 123456789:AAF...
4. Додай бота в канал як адміністратора
5. Отримай chat_id: https://api.telegram.org/bot<TOKEN>/getUpdates
   або через @userinfobot
```

### Як отримати Cloudflare API Token
```
dash.cloudflare.com → My Profile → API Tokens → Create Token
→ Custom token:
  Permissions:
    Zone → DNS → Edit
    Zone → SSL and Certificates → Edit
  Zone Resources: Include → Specific zone → auditorsec.com
                  Include → Specific zone → audityzer.io
→ Create Token → скопіюй
```

---

## Крок 2: Запуск workflows

### 2a. Виправити audityzer.io (NXDOMAIN)
```
GitHub → Actions → Fix audityzer.io DNS (NXDOMAIN)
→ Run workflow
→ dry_run: false
→ Run workflow

Перевірка (через 10 хв):
  dig +short audityzer.io A @1.1.1.1
  # Очікувано: 185.199.108.153
```

### 2b. Перевірити SSL Origin CA Monitor
```
GitHub → Actions → SSL Origin CA Expiry Monitor
→ Run workflow (ручний запуск)
→ Перевірити Step Summary у результатах
```

### 2c. Перевірити Diia.City Compliance
```
GitHub → Actions → Diia.City Compliance Monitor
→ Run workflow
→ Очікувати Telegram повідомлення
```

---

## Крок 3: SSL Fix для auditorsec.com (Error 525)

### 3a. Terraform — Origin CA Certificate
```bash
# Клонуй репо та перейди до terraform/
git clone https://github.com/romanchaa997/Audityzer
cd Audityzer

# Створи terraform/main.tf (див. нижче)
terraform init
terraform apply \
  -var="zone_id=YOUR_CLOUDFLARE_ZONE_ID" \
  -var="cloudflare_api_token=YOUR_API_TOKEN"

# Збережи outputs:
terraform output origin_certificate_pem > /etc/ssl/auditorsec.crt
terraform output -raw private_key_pem   > /etc/ssl/auditorsec.key
chmod 600 /etc/ssl/auditorsec.key
```

### 3b. Nginx конфіг
```nginx
server {
    listen 443 ssl;
    server_name auditorsec.com www.auditorsec.com;
    ssl_certificate     /etc/ssl/auditorsec.crt;
    ssl_certificate_key /etc/ssl/auditorsec.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    add_header Strict-Transport-Security "max-age=31536000" always;
}
```

### 3c. Cloudflare Dashboard
```
SSL/TLS → Overview → Encryption mode → Full (Strict)
```

### 3d. Верифікація
```bash
curl -v https://auditorsec.com 2>&1 | grep -E "SSL|cipher|subject|< HTTP"
# Очікувано: HTTP/2 200
```

---

## Крок 4: n8n Deploy (UptimeRobot → Telegram + ClickUp)

```bash
# Docker deploy
docker run -d \
  --name n8n-auditorsec \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=YOUR_STRONG_PASSWORD \
  -v n8n_data:/home/node/.n8n \
  --restart unless-stopped \
  n8nio/n8n

# Відкрий http://YOUR_SERVER_IP:5678
# Workflows → Import → вставити вміст .github/n8n/uptimerobot-telegram-clickup.json
# Credentials → Add → Telegram API → вставити TELEGRAM_BOT_TOKEN
# Credentials → Add → ClickUp API → вставити CLICKUP_API_TOKEN
# Активуй workflow → скопіюй webhook URL
```

### UptimeRobot налаштування
```
https://uptimerobot.com → My Settings → Integrations → Add Webhook
→ URL: https://YOUR_N8N_DOMAIN/webhook/uptimerobot-alert
→ POST → JSON
→ POST params:
    monitorURL     = $url$
    alertType      = $alertTypeFriendlyName$
    alertDateTime  = $alertDateTime$

Монітори додати:
  - https://auditorsec.com   (HTTP, кожні 5 хв)
  - https://audityzer.com    (HTTP, кожні 5 хв)
  - https://audityzer.io     (HTTP, кожні 5 хв)
  + SSL expiry alert для кожного
```

---

## Дедлайни

| Milestone | Дата | Дні залишилось | Статус |
|-----------|------|----------------|--------|
| Diia.City Q1 2026 | 10.04.2026 | — | Done |
| **Diia.City Q2 2026** | **10.07.2026** | **73** | Active |
| Audityzer compliance-checker | До 10.07.2026 | 73 | In progress |
| auditorsec.com SSL fix | ASAP | 0 | Critical |
| audityzer.io DNS fix | ASAP | 0 | Critical |

---

## Workflows додані (квітень 2026)

| Файл | Тригер | Призначення |
|------|--------|-------------|
| `diia-compliance.yml` | Щопонеділка 06:00 + manual | Compliance scan + Telegram + ClickUp |
| `origin-ca-monitor.yml` | 1-го числа місяця + manual | SSL expiry check + Telegram alert |
| `add-audityzer-io-dns.yml` | Manual (workflow_dispatch) | NXDOMAIN fix → GitHub Pages |
| `uptimerobot-telegram-clickup.json` | n8n import | Downtime alerts via UptimeRobot |

---

## Посилання

- [Cloudflare Origin CA docs](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/)
- [Terraform CF provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/origin_ca_certificate)
- [n8n docs](https://docs.n8n.io)
- [UptimeRobot webhooks](https://uptimerobot.com/integrations/webhooks-integration/)
- [Diia.City portal](https://my.diia.gov.ua)
- [GitHub Actions secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)

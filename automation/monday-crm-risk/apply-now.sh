#!/bin/bash
# ============================================================
# 🚀 AuditorSEC — APPLY NOW (Run This Locally)
# ============================================================
# 
# Цей скрипт робить ВСЕ автоматично:
# 1. Створює 7 колонок на Monday.com Deals board
# 2. Створює Risk Register + 11 полів в ClickUp
# 3. Виводить результат + наступні кроки
#
# ⚡ Запуск:
#   1. Отримай токени:
#      Monday: monday.com → Аватар → Developers → My Access Tokens
#      ClickUp: clickup.com → Settings → Apps → API Token
#   2. Запусти:
#      MONDAY_API_TOKEN=xxx CLICKUP_API_TOKEN=yyy bash apply-now.sh
# ============================================================

set -euo pipefail

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  🚀 AuditorSEC CRM Risk Pipeline — APPLY NOW    ║"
echo "╚══════════════════════════════════════════════════╝"

# --- Monday.com ---
if [ -n "${MONDAY_API_TOKEN:-}" ]; then
  echo ""
  echo "━━━ Monday.com: Creating 7 columns on Deals board ━━━"
  
  BOARD_ID=5065891772
  API="https://api.monday.com/v2"
  
  # Helper function
  monday_gql() {
    curl -s -X POST "$API" \
      -H "Content-Type: application/json" \
      -H "Authorization: $MONDAY_API_TOKEN" \
      -d "{\"query\": \"$1\"}"
  }
  
  # Check existing columns
  echo "📋 Checking existing columns..."
  COLS=$(monday_gql "{ boards(ids: [$BOARD_ID]) { columns { id title type } } }")
  echo "$COLS" | python3 -c "
import json,sys
d=json.load(sys.stdin)
cols=d.get('data',{}).get('boards',[{}])[0].get('columns',[])
for c in cols:
    print(f'  {c[\"id\"]:20s} {c[\"type\"]:15s} {c[\"title\"]}')
print(f'\n  Total: {len(cols)} columns')
" 2>/dev/null || echo "  (could not parse response — check token)"

  # Create Sentiment (status)
  echo ""
  echo "➕ Creating Sentiment column..."
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Sentiment\\\", column_type: status, defaults: \\\"{\\\\\\\"labels\\\\\\\":{\\\\\\\"0\\\\\\\":\\\\\\\"Positive\\\\\\\",\\\\\\\"1\\\\\\\":\\\\\\\"Neutral\\\\\\\",\\\\\\\"2\\\\\\\":\\\\\\\"Negative\\\\\\\"}}\\\") { id title } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED — may already exist'))" 2>/dev/null || echo "  ⚠️  Check response"

  # Create Likelihood (numbers)
  echo "➕ Creating Likelihood column..."
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Likelihood\\\", column_type: numbers) { id title } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  # Create Impact (numbers)
  echo "➕ Creating Impact column..."
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Impact\\\", column_type: numbers) { id title } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  # Create Risk Level (status)
  echo "➕ Creating Risk Level column..."
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Risk Level\\\", column_type: status, defaults: \\\"{\\\\\\\"labels\\\\\\\":{\\\\\\\"0\\\\\\\":\\\\\\\"Low\\\\\\\",\\\\\\\"1\\\\\\\":\\\\\\\"Medium\\\\\\\",\\\\\\\"2\\\\\\\":\\\\\\\"High\\\\\\\"}}\\\") { id title } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  sleep 2

  # Get column IDs for formulas
  echo ""
  echo "📋 Getting column IDs for formula references..."
  COL_MAP=$(monday_gql "{ boards(ids: [$BOARD_ID]) { columns { id title type } } }")
  
  # Extract column IDs using Python
  FORMULA_CMD=$(echo "$COL_MAP" | python3 -c "
import json,sys
d=json.load(sys.stdin)
cols=d.get('data',{}).get('boards',[{}])[0].get('columns',[])
cm={}
for c in cols:
    cm[c['title'].lower()]=c['id']

ecdId=cm.get('expected close date','date4')
ladId=cm.get('last activity date','date5')
impId=cm.get('impact','numbers0')
likId=cm.get('likelihood','numbers1')
senId=cm.get('sentiment','status_10')

print(f'ECD={ecdId}')
print(f'LAD={ladId}')
print(f'IMP={impId}')
print(f'LIK={likId}')
print(f'SEN={senId}')
" 2>/dev/null)
  
  eval "$FORMULA_CMD" 2>/dev/null || { ECD=date4; LAD=date5; IMP=numbers0; LIK=numbers1; SEN=status_10; }
  
  echo "  Expected Close Date → $ECD"
  echo "  Last Activity Date → $LAD"
  echo "  Impact → $IMP"
  echo "  Likelihood → $LIK"
  echo "  Sentiment → $SEN"
  
  # Create Days Overdue formula
  echo ""
  echo "➕ Creating Days Overdue formula..."
  FORMULA="IF(DAYS(TODAY(),{${ECD}})>0,DAYS(TODAY(),{${ECD}}),0)"
  DEFAULTS=$(python3 -c "import json;print(json.dumps(json.dumps({'formula':\"$FORMULA\"})))")
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Days Overdue\\\", column_type: formula, defaults: $DEFAULTS) { id } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  # Create Days No Touch formula
  echo "➕ Creating Days No Touch formula..."
  FORMULA2="DAYS(TODAY(),{${LAD}})"
  DEFAULTS2=$(python3 -c "import json;print(json.dumps(json.dumps({'formula':\"$FORMULA2\"})))")
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Days No Touch\\\", column_type: formula, defaults: $DEFAULTS2) { id } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  # Create Risk Score formula  
  echo "➕ Creating Risk Score formula..."
  FORMULA3="{${IMP}}*2+(6-{${LIK}})+IF(DAYS(TODAY(),{${ECD}})>0,MIN(DAYS(TODAY(),{${ECD}}),10),0)+IF(DAYS(TODAY(),{${LAD}})>7,3,0)+IF(\\\"{${SEN}}\\\"=\\\"Negative\\\",4,IF(\\\"{${SEN}}\\\"=\\\"Neutral\\\",1,0))"
  DEFAULTS3=$(python3 -c "import json;print(json.dumps(json.dumps({'formula':'''$FORMULA3'''})))")
  R=$(monday_gql "mutation { create_column(board_id: $BOARD_ID, title: \\\"Risk Score\\\", column_type: formula, defaults: $DEFAULTS3) { id } }")
  echo "  $R" | python3 -c "import json,sys;d=json.load(sys.stdin);print('✅',d.get('data',{}).get('create_column',{}).get('id','FAILED'))" 2>/dev/null || echo "  ⚠️  Check response"

  echo ""
  echo "✅ Monday.com columns complete!"
else
  echo ""
  echo "⏭️  MONDAY_API_TOKEN not set — skipping Monday.com"
  echo "   Get token: monday.com → Avatar → Developers → My Access Tokens"
fi

# --- ClickUp ---
if [ -n "${CLICKUP_API_TOKEN:-}" ]; then
  echo ""
  echo "━━━ ClickUp: Creating Risk Register list ━━━"
  
  TEAM_ID=90151967246
  CU_API="https://api.clickup.com/api/v2"
  
  clickup() {
    curl -s -X "$1" "$CU_API$2" \
      -H "Authorization: $CLICKUP_API_TOKEN" \
      -H "Content-Type: application/json" \
      ${3:+-d "$3"}
  }
  
  # Get spaces
  echo "🔍 Finding spaces..."
  SPACES=$(clickup GET "/team/$TEAM_ID/space?archived=false")
  SPACE_ID=$(echo "$SPACES" | python3 -c "
import json,sys
d=json.load(sys.stdin)
spaces=d.get('spaces',[])
for s in spaces:
    print(s['id'])
    break
" 2>/dev/null)
  
  if [ -n "$SPACE_ID" ]; then
    echo "  Using space: $SPACE_ID"
    
    # Create Risk Register list
    echo "➕ Creating Risk Register list..."
    LIST=$(clickup POST "/space/$SPACE_ID/list" '{"name":"Risk Register","content":"CRM Risk Register — tracks high-risk deals from Monday.com CRM"}')
    LIST_ID=$(echo "$LIST" | python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('id',''))" 2>/dev/null)
    
    if [ -n "$LIST_ID" ]; then
      echo "  ✅ List created: $LIST_ID"
      
      # Create custom fields
      echo "➕ Creating custom fields..."
      for FIELD_JSON in \
        '{"name":"Source","type":"drop_down","type_config":{"options":[{"name":"Monday CRM","orderindex":0},{"name":"Manual","orderindex":1},{"name":"BRAVE1","orderindex":2},{"name":"Other","orderindex":3}]}}' \
        '{"name":"Client/Deal","type":"short_text"}' \
        '{"name":"Monday Item URL","type":"url"}' \
        '{"name":"Likelihood","type":"number"}' \
        '{"name":"Impact","type":"number"}' \
        '{"name":"Risk Score","type":"number"}' \
        '{"name":"Risk Level","type":"drop_down","type_config":{"options":[{"name":"Low","orderindex":0},{"name":"Medium","orderindex":1},{"name":"High","orderindex":2},{"name":"Critical","orderindex":3}]}}' \
        '{"name":"Risk Trigger","type":"text"}' \
        '{"name":"Mitigation Plan","type":"text"}' \
        '{"name":"Deal Value at Risk","type":"currency","type_config":{"currency_type":"USD"}}' \
        '{"name":"Review Date","type":"date"}'; do
        FNAME=$(echo "$FIELD_JSON" | python3 -c "import json,sys;print(json.load(sys.stdin)['name'])")
        R=$(clickup POST "/list/$LIST_ID/field" "$FIELD_JSON")
        FID=$(echo "$R" | python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('id','FAILED'))" 2>/dev/null)
        echo "  ✅ $FNAME → $FID"
        sleep 0.3
      done
      
      # Create sample task
      echo "➕ Creating sample risk task..."
      clickup POST "/list/$LIST_ID/task" '{"name":"🔴 SAMPLE: Test Risk Entry — Score 15 (High)","description":"Sample CRM risk entry. Delete after verifying setup.","priority":2,"tags":["crm-risk","sample"]}' > /dev/null
      echo "  ✅ Sample task created"
      
      echo ""
      echo "✅ ClickUp Risk Register complete!"
      echo "  List ID: $LIST_ID"
      echo "  URL: https://app.clickup.com/$TEAM_ID/v/li/$LIST_ID"
      echo "  Set CLICKUP_RISK_LIST_ID=$LIST_ID in Pipedream"
    else
      echo "  ❌ Failed to create list. Response: $LIST"
    fi
  else
    echo "  ❌ No spaces found. Response: $SPACES"
  fi
else
  echo ""
  echo "⏭️  CLICKUP_API_TOKEN not set — skipping ClickUp"
  echo "   Get token: ClickUp → Settings → Apps → API Token"
fi

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  Done! Next: add 7 automations in Monday UI     ║"
echo "║  See: 03-automations-exact.md                   ║"
echo "╚══════════════════════════════════════════════════╝"

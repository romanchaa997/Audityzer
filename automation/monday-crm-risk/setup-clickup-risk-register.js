#!/usr/bin/env node
/**
 * ClickUp Risk Register — Automated Setup
 * 
 * Creates "Risk Register" list in your ClickUp workspace with:
 *   - 5 statuses: Open → In Review → Mitigated → Accepted → Closed
 *   - 11 custom fields (Source, Client/Deal, Likelihood, Impact, Risk Score, etc.)
 * 
 * Usage:
 *   CLICKUP_API_TOKEN=your_token node setup-clickup-risk-register.js
 * 
 * Get your token: ClickUp → Settings → Apps → API Token (Generate)
 * Workspace ID: 90151967246
 */

const CLICKUP_API = "https://api.clickup.com/api/v2";
const TEAM_ID = "90151967246";
const TOKEN = process.env.CLICKUP_API_TOKEN;

if (!TOKEN) {
  console.error("❌ Set CLICKUP_API_TOKEN environment variable first!");
  console.error("   Get it from: ClickUp → Settings (bottom-left) → Apps → Generate API Token");
  process.exit(1);
}

async function clickupRequest(method, path, body = null) {
  const opts = {
    method,
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${CLICKUP_API}${path}`, opts);
  const data = await res.json();
  if (!res.ok) {
    console.error(`❌ ${method} ${path} → ${res.status}:`, JSON.stringify(data));
  }
  return { ok: res.ok, data };
}

// Step 1: Find or create a space for Risk Register
async function findOrCreateSpace() {
  console.log("🔍 Looking for existing spaces...");
  const { data } = await clickupRequest("GET", `/team/${TEAM_ID}/space?archived=false`);
  const spaces = data.spaces || [];

  console.log(`   Found ${spaces.length} spaces: ${spaces.map(s => `${s.name} (${s.id})`).join(", ")}`);

  // Look for Finance & Grants or similar
  let targetSpace = spaces.find(s =>
    s.name.toLowerCase().includes("finance") ||
    s.name.toLowerCase().includes("grant") ||
    s.name.toLowerCase().includes("risk")
  );

  if (!targetSpace && spaces.length > 0) {
    // Use the first available space
    targetSpace = spaces[0];
    console.log(`   Using first space: ${targetSpace.name} (${targetSpace.id})`);
  }

  if (!targetSpace) {
    // Create a new space
    console.log("   No spaces found, creating 'AuditorSEC Risk Management'...");
    const { ok, data: newSpace } = await clickupRequest("POST", `/team/${TEAM_ID}/space`, {
      name: "AuditorSEC Risk Management",
      multiple_assignees: true,
      features: {
        due_dates: { enabled: true },
        custom_fields: { enabled: true },
        priorities: { enabled: true },
        tags: { enabled: true },
      },
    });
    if (ok) {
      targetSpace = newSpace;
      console.log(`   ✅ Created space: ${newSpace.name} (${newSpace.id})`);
    } else {
      console.error("   Failed to create space!");
      process.exit(1);
    }
  }

  return targetSpace;
}

// Step 2: Find or create folder, then create list
async function createRiskRegisterList(spaceId) {
  // Check existing lists first
  console.log("\n🔍 Checking for existing 'Risk Register' list...");
  const { data: folderless } = await clickupRequest("GET", `/space/${spaceId}/list?archived=false`);
  const existingList = (folderless.lists || []).find(l =>
    l.name.toLowerCase().includes("risk register")
  );

  if (existingList) {
    console.log(`   ⏭️ Risk Register list already exists: ${existingList.name} (${existingList.id})`);
    return existingList;
  }

  // Create the list with custom statuses
  console.log("   Creating 'Risk Register' list...");
  const { ok, data: newList } = await clickupRequest("POST", `/space/${spaceId}/list`, {
    name: "Risk Register",
    content: "CRM Risk Register — auto-created by AuditorSEC pipeline. Tracks high-risk deals from Monday.com CRM.",
    status: "Open",
    priority: 2,
    assignee: null,
  });

  if (ok) {
    console.log(`   ✅ Created list: Risk Register (${newList.id})`);
    return newList;
  } else {
    console.error("   Failed to create list!");
    return null;
  }
}

// Step 3: Update list statuses
async function updateStatuses(listId) {
  console.log("\n📊 Note: Statuses should be configured in ClickUp UI:");
  console.log("   List Settings → Statuses → Edit:");
  console.log("   Open (blue) → In Review (purple) → Mitigated (green) → Accepted (yellow) → Closed (gray)");
  // ClickUp API v2 doesn't support direct status editing on lists easily
  // The default statuses (to do, in progress, complete) work, but custom ones need UI
}

// Step 4: Create custom fields
async function createCustomFields(listId) {
  console.log("\n🔧 Creating custom fields...");

  const fields = [
    {
      name: "Source",
      type: "drop_down",
      type_config: {
        options: [
          { name: "Monday CRM", color: "#4573D2", orderindex: 0 },
          { name: "Manual", color: "#FDAB3D", orderindex: 1 },
          { name: "BRAVE1", color: "#00C875", orderindex: 2 },
          { name: "Other", color: "#C4C4C4", orderindex: 3 },
        ],
      },
    },
    {
      name: "Client/Deal",
      type: "short_text",
    },
    {
      name: "Monday Item URL",
      type: "url",
    },
    {
      name: "Likelihood",
      type: "number",
    },
    {
      name: "Impact",
      type: "number",
    },
    {
      name: "Risk Score",
      type: "number",
    },
    {
      name: "Risk Level",
      type: "drop_down",
      type_config: {
        options: [
          { name: "Low", color: "#00C875", orderindex: 0 },
          { name: "Medium", color: "#FDAB3D", orderindex: 1 },
          { name: "High", color: "#E2445C", orderindex: 2 },
          { name: "Critical", color: "#401694", orderindex: 3 },
        ],
      },
    },
    {
      name: "Risk Trigger",
      type: "text",
    },
    {
      name: "Mitigation Plan",
      type: "text",
    },
    {
      name: "Deal Value at Risk",
      type: "currency",
      type_config: {
        currency_type: "USD",
      },
    },
    {
      name: "Review Date",
      type: "date",
    },
  ];

  const fieldIds = {};

  for (const field of fields) {
    const { ok, data } = await clickupRequest("POST", `/list/${listId}/field`, field);
    if (ok) {
      console.log(`   ✅ ${field.name} (${field.type}) → ${data.id}`);
      fieldIds[field.name] = data.id;
    } else {
      console.log(`   ⚠️  ${field.name} — may already exist or failed`);
    }
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 500));
  }

  return fieldIds;
}

// Step 5: Create a sample task to verify
async function createSampleTask(listId) {
  console.log("\n📝 Creating sample risk entry...");
  const { ok, data } = await clickupRequest("POST", `/list/${listId}/task`, {
    name: "🔴 SAMPLE: Test Risk Entry — Score 15 (High)",
    description: `## Sample CRM Risk Entry\n\n| Field | Value |\n|-------|-------|\n| **Source** | Monday CRM |\n| **Client** | Test Client |\n| **Risk Score** | 15 |\n| **Risk Level** | High |\n| **Impact** | 4/5 |\n| **Likelihood** | 3/5 |\n\n**Risk Triggers:** 10d overdue, Negative sentiment\n\n---\n\n### Mitigation Plan\n- [ ] Schedule call with client\n- [ ] Review proposal\n- [ ] Update Monday CRM\n\n_This is a sample entry. Delete after verifying setup._`,
    priority: 2,
    tags: ["crm-risk", "sample"],
  });

  if (ok) {
    console.log(`   ✅ Sample task created: ${data.url}`);
  }
}

async function main() {
  console.log("🚀 ClickUp Risk Register — Automated Setup");
  console.log("============================================\n");
  console.log(`Team ID: ${TEAM_ID}\n`);

  // Find/create space
  const space = await findOrCreateSpace();
  if (!space) process.exit(1);

  // Create Risk Register list
  const list = await createRiskRegisterList(space.id);
  if (!list) process.exit(1);

  // Update statuses (note)
  await updateStatuses(list.id);

  // Create custom fields
  const fieldIds = await createCustomFields(list.id);

  // Create sample task
  await createSampleTask(list.id);

  console.log("\n============================================");
  console.log("✅ ClickUp Risk Register setup complete!\n");
  console.log(`📌 List ID: ${list.id}`);
  console.log(`📌 Space: ${space.name} (${space.id})`);
  console.log(`📌 URL: https://app.clickup.com/${TEAM_ID}/v/li/${list.id}`);
  console.log("\n📊 Custom Field IDs (save for Pipedream/n8n):");
  console.log(JSON.stringify(fieldIds, null, 2));
  console.log("\n📌 Next steps:");
  console.log("   1. Go to list → Edit statuses: Open → In Review → Mitigated → Accepted → Closed");
  console.log("   2. Set CLICKUP_RISK_LIST_ID=" + list.id + " in Pipedream env");
  console.log("   3. Configure n8n workflow with field IDs above");
}

main().catch(console.error);

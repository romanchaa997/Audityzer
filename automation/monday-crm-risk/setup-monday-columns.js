#!/usr/bin/env node
/**
 * Monday.com CRM Risk Pipeline — Automated Column Setup
 * 
 * Creates all required columns on Deals board (5065891772):
 *   - Sentiment (status), Likelihood (numbers), Impact (numbers)
 *   - Days Overdue (formula), Days No Touch (formula), Risk Score (formula)
 *   - Risk Level (status)
 * 
 * Usage:
 *   MONDAY_API_TOKEN=your_token node setup-monday-columns.js
 * 
 * Get your token: monday.com → Profile Picture → Admin → API
 */

const MONDAY_API = "https://api.monday.com/v2";
const BOARD_ID = "5065891772"; // Deals board
const TOKEN = process.env.MONDAY_API_TOKEN;

if (!TOKEN) {
  console.error("❌ Set MONDAY_API_TOKEN environment variable first!");
  console.error("   Get it from: monday.com → Avatar → Developers → My Access Tokens");
  process.exit(1);
}

async function mondayQuery(query, variables = {}) {
  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) {
    console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
  }
  return data;
}

// Step 1: Create status columns (Sentiment, Risk Level)
async function createStatusColumn(boardId, title, labels) {
  const defaults = JSON.stringify({ labels });
  const query = `mutation {
    create_column(
      board_id: ${boardId},
      title: "${title}",
      column_type: status,
      defaults: ${JSON.stringify(defaults)}
    ) { id title }
  }`;
  const result = await mondayQuery(query);
  console.log(`✅ Created status column: ${title} →`, result.data?.create_column?.id || "check errors above");
  return result.data?.create_column?.id;
}

// Step 2: Create numbers columns (Likelihood, Impact)
async function createNumbersColumn(boardId, title) {
  const query = `mutation {
    create_column(
      board_id: ${boardId},
      title: "${title}",
      column_type: numbers
    ) { id title }
  }`;
  const result = await mondayQuery(query);
  console.log(`✅ Created numbers column: ${title} →`, result.data?.create_column?.id || "check errors above");
  return result.data?.create_column?.id;
}

// Step 3: Create formula columns
async function createFormulaColumn(boardId, title, formula) {
  const defaults = JSON.stringify({ formula });
  const query = `mutation {
    create_column(
      board_id: ${boardId},
      title: "${title}",
      column_type: formula,
      defaults: ${JSON.stringify(defaults)}
    ) { id title }
  }`;
  const result = await mondayQuery(query);
  console.log(`✅ Created formula column: ${title} →`, result.data?.create_column?.id || "check errors above");
  return result.data?.create_column?.id;
}

// Step 4: Get existing columns to check what already exists
async function getExistingColumns(boardId) {
  const query = `query {
    boards(ids: [${boardId}]) {
      columns { id title type settings_str }
    }
  }`;
  const result = await mondayQuery(query);
  return result.data?.boards?.[0]?.columns || [];
}

async function main() {
  console.log("🚀 Monday.com CRM Risk Pipeline — Column Setup");
  console.log("================================================\n");
  console.log(`Board ID: ${BOARD_ID}\n`);

  // Check existing columns
  console.log("📋 Checking existing columns...");
  const existing = await getExistingColumns(BOARD_ID);
  const existingTitles = existing.map((c) => c.title.toLowerCase());
  console.log(`   Found ${existing.length} existing columns: ${existing.map(c => c.title).join(", ")}\n`);

  // Track column IDs for formula references
  const columnIds = {};
  existing.forEach((c) => {
    columnIds[c.title.toLowerCase()] = c.id;
  });

  // --- Sentiment (Status) ---
  if (!existingTitles.includes("sentiment")) {
    columnIds["sentiment"] = await createStatusColumn(BOARD_ID, "Sentiment", {
      0: "Positive",
      1: "Neutral",
      2: "Negative",
    });
  } else {
    console.log("⏭️  Sentiment column already exists:", columnIds["sentiment"]);
  }

  // --- Likelihood (Numbers 1-5) ---
  if (!existingTitles.includes("likelihood")) {
    columnIds["likelihood"] = await createNumbersColumn(BOARD_ID, "Likelihood");
  } else {
    console.log("⏭️  Likelihood column already exists:", columnIds["likelihood"]);
  }

  // --- Impact (Numbers 1-5) ---
  if (!existingTitles.includes("impact")) {
    columnIds["impact"] = await createNumbersColumn(BOARD_ID, "Impact");
  } else {
    console.log("⏭️  Impact column already exists:", columnIds["impact"]);
  }

  // Small delay to let Monday propagate columns
  await new Promise((r) => setTimeout(r, 2000));

  // --- Re-fetch columns to get IDs for formula references ---
  console.log("\n📋 Re-fetching column IDs for formula references...");
  const updatedCols = await getExistingColumns(BOARD_ID);
  updatedCols.forEach((c) => {
    columnIds[c.title.toLowerCase()] = c.id;
  });

  // Show column ID map
  console.log("\n📊 Column ID Map:");
  Object.entries(columnIds).forEach(([name, id]) => {
    console.log(`   ${name} → ${id}`);
  });

  // --- Days Overdue (Formula) ---
  // Uses Expected Close Date column
  const closeDateId = columnIds["expected close date"];
  if (closeDateId && !existingTitles.includes("days overdue")) {
    const formula = `IF(DAYS(TODAY(),{${closeDateId}})>0,DAYS(TODAY(),{${closeDateId}}),0)`;
    columnIds["days overdue"] = await createFormulaColumn(BOARD_ID, "Days Overdue", formula);
  } else if (existingTitles.includes("days overdue")) {
    console.log("⏭️  Days Overdue column already exists");
  } else {
    console.log("⚠️  Cannot create Days Overdue — 'Expected Close Date' column not found. Creating with placeholder...");
    columnIds["days overdue"] = await createFormulaColumn(BOARD_ID, "Days Overdue", "0");
  }

  // --- Days No Touch (Formula) ---
  const lastActivityId = columnIds["last activity date"];
  if (lastActivityId && !existingTitles.includes("days no touch")) {
    const formula = `DAYS(TODAY(),{${lastActivityId}})`;
    columnIds["days no touch"] = await createFormulaColumn(BOARD_ID, "Days No Touch", formula);
  } else if (existingTitles.includes("days no touch")) {
    console.log("⏭️  Days No Touch column already exists");
  } else {
    console.log("⚠️  Cannot create Days No Touch — 'Last Activity Date' column not found. Creating with placeholder...");
    columnIds["days no touch"] = await createFormulaColumn(BOARD_ID, "Days No Touch", "0");
  }

  // --- Risk Score (Formula) ---
  // {impact}*2+(6-{likelihood})+IF(DAYS(TODAY(),{expected_close_date})>0,MIN(DAYS(TODAY(),{expected_close_date}),10),0)+IF(DAYS(TODAY(),{last_activity_date})>7,3,0)+IF("{sentiment}"="Negative",4,IF("{sentiment}"="Neutral",1,0))
  const impactId = columnIds["impact"];
  const likelihoodId = columnIds["likelihood"];
  const sentimentId = columnIds["sentiment"];

  if (!existingTitles.includes("risk score")) {
    let riskFormula;
    if (impactId && likelihoodId && sentimentId && closeDateId && lastActivityId) {
      riskFormula = `{${impactId}}*2+(6-{${likelihoodId}})+IF(DAYS(TODAY(),{${closeDateId}})>0,MIN(DAYS(TODAY(),{${closeDateId}}),10),0)+IF(DAYS(TODAY(),{${lastActivityId}})>7,3,0)+IF("{${sentimentId}}"="Negative",4,IF("{${sentimentId}}"="Neutral",1,0))`;
    } else {
      // Fallback: simpler formula if some columns missing
      riskFormula = impactId && likelihoodId
        ? `{${impactId}}*2+(6-{${likelihoodId}})`
        : "0";
      console.log("⚠️  Using simplified Risk Score formula — some dependency columns not found");
    }
    columnIds["risk score"] = await createFormulaColumn(BOARD_ID, "Risk Score", riskFormula);
  } else {
    console.log("⏭️  Risk Score column already exists");
  }

  // --- Risk Level (Status) ---
  if (!existingTitles.includes("risk level")) {
    columnIds["risk level"] = await createStatusColumn(BOARD_ID, "Risk Level", {
      0: "Low",
      1: "Medium",
      2: "High",
    });
  } else {
    console.log("⏭️  Risk Level column already exists:", columnIds["risk level"]);
  }

  console.log("\n================================================");
  console.log("✅ Monday.com column setup complete!\n");
  console.log("📌 Next steps:");
  console.log("   1. Go to Board → Automate (⚡) to add 7 automation recipes");
  console.log("   2. See 03-automations-exact.md for copy-paste automation text");
  console.log("   3. Set up n8n/Pipedream webhook for ClickUp integration");

  // Output column map for downstream use
  const outputMap = {};
  const finalCols = await getExistingColumns(BOARD_ID);
  finalCols.forEach((c) => {
    outputMap[c.title] = { id: c.id, type: c.type };
  });
  console.log("\n📊 Final Column Map (save this for Pipedream/n8n config):");
  console.log(JSON.stringify(outputMap, null, 2));
}

main().catch(console.error);

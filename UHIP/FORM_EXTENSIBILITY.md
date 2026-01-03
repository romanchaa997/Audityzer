# Audityzer Turbine Inspection Form - Extensibility Guide v0.1

## Overview

The Audityzer Turbine Inspection Form is designed with extensibility as a core principle. The base structure (v0.1) provides essential inspection capabilities while maintaining backward compatibility as new fields and modules are added.

## Core Design Principles

### 1. **Non-Breaking Changes**
All new fields must be added as optional fields with default values. Required fields are locked in the base structure and cannot be modified without a major version bump.

### 2. **Modular Architecture**
The form is organized into logical sections:
- Turbine Identification (LOCKED in v0.1+)
- Visual Inspection (LOCKED in v0.1+)
- Operational Metrics (EXTENSIBLE)
- Maintenance History (EXTENSIBLE)
- Inspection Details (LOCKED in v0.1+)

### 3. **Field Naming Convention**
```
<sectionName>_<fieldName>_<version>
Example: operationalMetrics_vibrationLevel_v0.1
```

## Adding New Fields

### Step 1: Choose Appropriate Section
1. Review existing sections to find the best fit
2. If no suitable section exists, create a new extensible section
3. Document the rationale for placement

### Step 2: Define Field Structure
```json
{
  "fieldName": {
    "type": "[text|number|date|select|array|geolocation|file|signature]",
    "label": "Human-readable field name",
    "description": "Detailed explanation of what this field captures",
    "required": false,
    "version": "0.2 or later",
    "deprecated": false,
    "unit": "(optional) measurement unit if applicable",
    "options": "(optional) array for select fields",
    "validation": "(optional) regex or constraint rules",
    "metadata": {
      "addedIn": "v0.2",
      "addedBy": "contributor-name",
      "reason": "Why this field was added"
    }
  }
}
```

### Step 3: Backward Compatibility Check
- New fields MUST have `"required": false`
- Provide sensible default values
- Ensure older form submissions can be processed without the new field
- Document any conditional logic that depends on the new field

## Adding New Sections

### Requirements
1. Create a descriptive section name (camelCase)
2. Set `"required": false` for the entire section
3. Document the business purpose and use case
4. Link to related documentation or standards

### Example
```json
{
  "advancedDiagnostics": {
    "title": "Advanced Diagnostic Assessment",
    "description": "Optional advanced analysis section for facilities with IoT sensors",
    "required": false,
    "version": "0.2+",
    "fields": {
      // New fields go here
    }
  }
}
```

## Version Management

### Version Format: MAJOR.MINOR
- **MAJOR**: Breaking changes (only when necessary)
- **MINOR**: Backward-compatible additions

### Version Progression
- v0.1: Base form (RELEASED)
- v0.2: First round of optional field additions (PLANNED)
- v1.0: Stable release (FUTURE)

## Deprecation Strategy

When a field is no longer recommended:
```json
{
  "oldField": {
    "type": "text",
    "deprecated": true,
    "deprecationVersion": "0.3",
    "replacement": "newFieldName",
    "migrationGuide": "URL to migration documentation"
  }
}
```

## Implementation Examples

### Example 1: Adding a Simple Text Field
```json
{
  "bladeMaterialComposition": {
    "type": "text",
    "label": "Blade Material Composition",
    "description": "Primary material composition of turbine blades (e.g., carbon fiber, glass fiber)",
    "required": false,
    "version": "0.2",
    "maxLength": 500
  }
}
```

### Example 2: Adding a Conditional Section
```json
{
  "iotSensorData": {
    "title": "IoT Sensor Integration (Optional)",
    "required": false,
    "version": "0.2",
    "condition": "facilityHasIoT === true",
    "fields": {
      "sensorType": {"type": "select", "options": ["SCADA", "Distributed", "Wireless"]},
      "dataCollectionInterval": {"type": "number", "unit": "minutes"},
      "lastSyncTime": {"type": "date"}
    }
  }
}
```

### Example 3: Extending Operational Metrics
```json
{
  "operationalMetrics": {
    // ... existing fields ...
    "powerOutputTrend": {
      "type": "array",
      "label": "Power Output Trend (Last 12 Months)",
      "required": false,
      "version": "0.2",
      "items": {
        "month": "string (YYYY-MM)",
        "outputMWh": "number"
      }
    }
  }
}
```

## Testing & Validation

Before releasing field additions:
1. ✅ Verify backward compatibility with v0.1 submissions
2. ✅ Test with mock data sets
3. ✅ Document validation rules clearly
4. ✅ Update schema version number
5. ✅ Create migration guide for developers
6. ✅ Update form rendering templates

## Contribution Process

1. **Propose** - Open an issue describing the new field/section
2. **Discuss** - Get consensus from UHIP consortium members
3. **Implement** - Add field definitions to schema
4. **Test** - Validate with sample data
5. **Document** - Update this guide and related documentation
6. **Release** - Bundle with next minor version release

## Support & Questions

For questions about extending the form:
- Open an issue in the repository
- Contact the UHIP technical working group
- Review existing extension examples in the `/examples` directory

## See Also

- `audityzer-turbine-inspection-form-v0.1.json` - Base form schema
- `CHANGELOG.md` - Version history
- `TESTING.md` - Testing procedures for form changes

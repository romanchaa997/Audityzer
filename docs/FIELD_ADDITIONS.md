# How to Add New Fields to Audityzer Turbine Inspection Form v0.1

This guide explains the process for extending the Audityzer Turbine Inspection Form without breaking the existing base structure.

## Quick Summary

**Goal**: Add new fields to the form while preserving v0.1 baseline functionality.

**Process**:
1. Create GitHub Issue with field proposal
2. Add item to GitHub Project board
3. Implement in feature branch
4. Test thoroughly
5. Create Pull Request & merge
6. Update documentation version

---

## Step 1: Propose New Field via GitHub Issue

Create a new issue with the title format: `[Enhancement] Add <Field Name> for <Category>`

### Issue Template

```markdown
## Field Proposal

### Basic Information
- **Field Name**: [Name of the field]
- **Field Type**: [Text/Number/Dropdown/Date/Coordinates/Yes-No/etc.]
- **Category**: [Steam-specific/Gas-specific/Control/Measurement/Other]
- **Required**: [Yes/No]
- **Web Support**: [Yes/No]
- **Mobile Support**: [Yes/No]

### Purpose & Justification
[Why is this field needed? What data will it capture?]

### Example Usage
[How would this field be used in practice?]

### Related Fields
[Any existing fields it depends on or relates to?]

### Implementation Notes
[Any technical considerations or edge cases?]
```

### Example Issue

```markdown
## [Enhancement] Add Insulation Resistance for Steam Turbines

### Basic Information
- **Field Name**: Insulation Resistance (Ohms)
- **Field Type**: Number + Unit dropdown
- **Category**: Steam-specific
- **Required**: No
- **Web Support**: Yes
- **Mobile Support**: Yes

### Purpose & Justification
Insulation resistance is a critical electrical parameter that indicates the health of turbine winding insulation. It helps identify potential failure modes before they become critical.

### Example Usage
Inspectors would record insulation resistance values during routine maintenance inspections, typically measured at different temperatures. Values would be compared against manufacturer specifications and historical trends.

### Related Fields
- Temperature (can affect readings)
- Ambient humidity (affects interpretation)
- Steam turbine type (specific to steam turbines)

### Implementation Notes
- Typically measured in megohms (MΩ)
- Should support multiple unit conversions
- Consider adding validation rules based on turbine age
```

---

## Step 2: Add Item to GitHub Project

Once the issue is created:

1. Go to [GitHub Project: Audityzer Turbine Inspection Form v0.1](https://github.com/users/romanchaa997/projects/9)
2. Click "Add item"
3. Search for and link the GitHub Issue you just created
4. Set status to **"Proposed"** (or "Todo" depending on board setup)
5. Add labels for quick filtering:
   - `steam-turbine` or `gas-turbine` or `control` (category)
   - `v0.2` or `v0.3` (target version)
   - `enhancement` (field type)

---

## Step 3: Implementation - Create Feature Branch

```bash
# Create feature branch
git checkout -b feature/add-insulation-resistance

# Or for multiple fields
git checkout -b feature/steam-turbine-enhancements-v0.2
```

### Branch Naming Convention

- Feature: `feature/add-<field-name>`
- Enhancement: `enhance/<category>-fields`
- Bugfix: `fix/<issue-number>`

---

## Step 4: Update Documentation

### Update TURBINE_INSPECTION_FORM_v0.1.md

Add the new field to the appropriate section:

```markdown
## Steam-Specific Fields (v0.2 Update)

| Field Name | Type | Required | Web | Mobile | Category |
|---|---|---|---|---|---|
| Insulation Resistance (Ω) | Number + Unit | No | Yes | Yes | Electrical |
```

### Create CHANGELOG Entry

Create or update `CHANGELOG.md`:

```markdown
## [v0.2] - 2026-01-15

### Added
- Insulation Resistance field for steam turbines (#47)
- Enhanced control system monitoring fields (#48)
- New measurement calibration date field (#49)

### Changed
- Updated field documentation with v0.2 additions
- Improved field validation rules

### Fixed
- Field ordering in steam-specific section
```

---

## Step 5: Code Implementation

### Form Schema Update

Update validation schema to include new field:

```javascript
// schema/turbine-inspection-fields.js
export const steamTurbineFields = {
  // ... existing fields
  insulationResistance: {
    name: 'insulationResistance',
    label: 'Insulation Resistance (Ω)',
    type: 'number',
    unit: 'megohms',
    required: false,
    platforms: ['web', 'mobile'],
    validationRules: [
      { type: 'min', value: 0 },
      { type: 'max', value: 999999 },
    ],
    visibility: {
      showWhen: {
        turbineType: 'steam'
      }
    }
  }
}
```

### UI Component

Create component for the new field:

```javascript
// components/InsulationResistanceField.jsx
import React from 'react';

export const InsulationResistanceField = ({
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="field-group">
      <label>Insulation Resistance</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter resistance in megohms"
        disabled={disabled}
        min="0"
      />
      <span className="unit">MΩ</span>
    </div>
  );
};
```

---

## Step 6: Testing

### Unit Tests

```javascript
// tests/fields/insulation-resistance.test.js
describe('InsulationResistanceField', () => {
  it('should accept numeric values', () => {
    // test implementation
  });
  
  it('should validate min/max ranges', () => {
    // test implementation
  });
  
  it('should only show for steam turbines', () => {
    // test implementation
  });
});
```

### Integration Tests

- Test form submission with new field
- Test visibility logic (only shows for steam turbines)
- Test mobile and web rendering
- Test data persistence

### Manual Testing Checklist

- [ ] Field appears only when turbine type = "Steam"
- [ ] Field accepts numeric input in range 0-999,999
- [ ] Field is optional (can submit form without it)
- [ ] Field displays correctly on mobile and web
- [ ] Data persists after form submission
- [ ] Data exports correctly in reports
- [ ] Works in offline mode (if applicable)

---

## Step 7: Create Pull Request

### PR Title Format

```
[v0.2] Add Insulation Resistance field for Steam turbines (#47)
```

### PR Checklist

- [ ] Feature branch created from latest `main`
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Code reviewed locally
- [ ] No breaking changes to existing fields
- [ ] Mobile and web tested
- [ ] GitHub Issue linked
- [ ] Project item moved to "In Review"

### PR Template

```markdown
## Description
Adds Insulation Resistance field for steam turbine inspection as part of v0.2 enhancement.

## Type of Change
- [x] New field addition
- [ ] Field modification
- [ ] Bug fix
- [ ] Documentation update

## Linked Issue
Closes #47

## Changes Made
- Added Insulation Resistance field schema
- Created InsulationResistanceField component
- Updated validation rules
- Added unit tests
- Updated documentation

## Testing
- [x] Unit tests pass
- [x] Integration tests pass
- [x] Manual testing completed
- [x] Mobile testing completed
- [x] Web testing completed

## Breaking Changes
None - fully backward compatible with v0.1
```

---

## Step 8: Merge & Release

### Code Review

1. Project maintainer reviews PR
2. At least one approval required
3. All CI/CD checks passing
4. No conflicts with main branch

### Merge

```bash
# Squash commits for clean history
git merge --squash feature/add-insulation-resistance
git commit -m "[v0.2] Add Insulation Resistance field for Steam turbines (#47)"
```

### Update Project Board

1. Move issue to "Done" column
2. Add label: `v0.2-released`
3. Link merged PR
4. Close GitHub Issue

### Tag Release

```bash
git tag -a v0.2 -m "Audityzer Turbine Inspection Form v0.2

- Added Insulation Resistance field for steam turbines
- Enhanced control system monitoring
- Improved measurement calibration tracking"
```

---

## Field Addition Patterns

### Pattern 1: Simple Text Field

**Example**: Equipment Serial Number

```javascript
{
  name: 'equipmentSerialNumber',
  type: 'text',
  required: false,
  platforms: ['web', 'mobile']
}
```

### Pattern 2: Dropdown Selection

**Example**: Turbine Cycle Type

```javascript
{
  name: 'turbineCycleType',
  type: 'dropdown',
  options: ['simple', 'combined', 'unknown'],
  required: true,
  visibility: {
    showWhen: { turbineType: 'gas' }
  }
}
```

### Pattern 3: Numeric with Validation

**Example**: Bearing Temperature

```javascript
{
  name: 'bearingTemperature',
  type: 'number',
  unit: '°C',
  required: true,
  validationRules: [
    { type: 'min', value: -50 },
    { type: 'max', value: 150 },
  ]
}
```

### Pattern 4: Repeating Group (Array)

**Example**: Multiple Bearing Locations

```javascript
{
  name: 'bearingTemperatures',
  type: 'array',
  items: {
    location: 'dropdown',
    temperature: 'number',
    unit: '°C'
  },
  required: false
}
```

---

## Common Mistakes to Avoid

❌ **Don't modify v0.1 base fields** - Only add new fields

✅ **Do preserve backward compatibility**

❌ **Don't skip testing** - Test on both platforms

✅ **Do update documentation first**

❌ **Don't merge without PR review**

✅ **Do link to GitHub Issues**

❌ **Don't forget to update the project board**

✅ **Do follow naming conventions**

---

## Helpful Links

- [GitHub Project Board](https://github.com/users/romanchaa997/projects/9)
- [Main Documentation](TURBINE_INSPECTION_FORM_v0.1.md)
- [Issues](https://github.com/romanchaa997/Audityzer/issues)
- [Pull Requests](https://github.com/romanchaa997/Audityzer/pulls)

---

**Last Updated**: 2026-01-03
**Maintainer**: @romanchaa997

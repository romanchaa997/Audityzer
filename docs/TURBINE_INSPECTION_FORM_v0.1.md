# Audityzer Turbine Inspection Form v0.1

## Document Purpose
This document describes the **base checklist for turbine inspection** in Audityzer (web form + mobile client) and the minimal set of fields common to all steam and gas turbine types.

## Version Control
- **Version**: v0.1
- **Status**: Base Framework
- **Last Updated**: 2026-01-03
- **Repository**: [github.com/romanchaa997/Audityzer](https://github.com/romanchaa997/Audityzer)
- **GitHub Project**: [Audityzer Turbine Inspection Form v0.1](https://github.com/users/romanchaa997/projects/9)

## Core Field Structure (All Turbine Types)

### 1.1 Basic Information Fields

| Field Name | Type | Required | Web | Mobile | Purpose |
|---|---|---|---|---|---|
| ID об'єкта / станції | Text | Yes | Yes | Yes | Unique station/object identifier |
| Назва об'єкта | Text | Yes | Yes | Yes | Object/facility name |
| Локація | Text | Yes | Yes | Yes | Country/City/Plant location |
| GPS координати | Coordinates | No | No | Yes | GPS location data (mobile-first) |
| Тип турбіни | Dropdown | Yes | Yes | Yes | Steam / Gas / Other |
| Модель | Text | Yes | Yes | Yes | Turbine model designation |
| Виробник | Text | Yes | Yes | Yes | Manufacturer name |
| Рік випуску | Year | No | Yes | Yes | Manufacturing year |
| Потужність | Number + Unit | No | Yes | Yes | MW or kW capacity |
| Напрацювання (години) | Number | No | Yes | Yes | Total operating hours |
| Дата/час початку | DateTime | Yes | Yes | Yes | Inspection start time |
| Інспектор ПІБ | Text | Yes | Yes | Yes | Inspector full name |
| Роль інспектора | Dropdown | Yes | Yes | Yes | Engineer / Technician / Other |
| Режим роботи | Dropdown | Yes | Yes | Yes | Idle / Operating / Maintenance |

### 1.2 Node Status (Repeating Group)

| Field Name | Type | Required | Web | Mobile | Purpose |
|---|---|---|---|---|---|
| Вузол | Dropdown | Yes | Yes | Yes | Housing/Bearing/Seal/Rotor/Other |
| Статус | Dropdown | Yes | Yes | Yes | OK / Watch / Defect |
| Тип дефекту | Dropdown | Conditional | Yes | Yes | Only if Status = Defect |
| Опис дефекту | Text | No | Yes | Yes | Detailed description |
| Рівень ризику | Dropdown | No | Yes | Yes | Low / Medium / High / Critical |
| Медіа-ID | Link/UUID | No | Yes | Yes | Reference to photos/videos |

### 1.3 Measurements (Core)

| Field Name | Type | Required | Web | Mobile | Purpose |
|---|---|---|---|---|---|
| Точка вимірювання вібрації | Dropdown | Yes | Yes | Yes | Measurement location |
| Вібрація (значення) | Number | Yes | Yes | Yes | Vibration measurement |
| Одиниця вібрації | Dropdown | Yes | Yes | Yes | mm/s or g |
| Частота обертання | Number | No | Yes | Yes | RPM |
| Точка вимірювання температури | Dropdown | Yes | Yes | Yes | Measurement location |
| Температура | Number | Yes | Yes | Yes | Temperature in °C |

### 1.4 Summary

| Field Name | Type | Required | Web | Mobile | Purpose |
|---|---|---|---|---|---|
| Загальна оцінка стану | Dropdown | Yes | Yes | Yes | Overall assessment |
| Коротке резюме | Text | Yes | Yes | Yes | Summary findings |
| Рекомендовані кроки | Text | Yes | Yes | Yes | Next actions |
| Потреба в додаткових вимірюваннях | Yes/No | No | Yes | Yes | Additional tests needed |
| Підпис інспектора | Checkbox/Signature | Yes | Yes | Yes | Digital signature |

---

## Steam-Specific Fields

**Visibility Logic**: Show only when `Тип турбіни = Steam`

| Field Name | Type | Required | Web | Mobile | Category |
|---|---|---|---|---|---|
| Тип парової турбіни | Dropdown | No | Yes | Yes | Condensing / Extraction / CHP |
| Номінальний тиск пари (вход) | Number + Unit | No | Yes | Yes | bar / MPa |
| Фактичний тиск пари (вход) | Number + Unit | No | Yes | Yes | Current pressure |
| Номінальна T° пари (вход) | Number | No | Yes | Yes | Nominal °C |
| Фактична T° пари (вход) | Number | No | Yes | Yes | Current °C |
| Стан паропроводів ВТ/НТ | Dropdown + Text | No | Yes | Yes | Corrosion / Isolation / Leaks |
| Стан сопел/направляючих | Dropdown + Text | No | Yes | Yes | Deposits / Erosion |
| Стан gland seals | Dropdown + Text | No | Yes | Yes | Leaks / Temperature / Pressure |

---

## Gas-Specific Fields

**Visibility Logic**: Show only when `Тип турбіни = Gas`

| Field Name | Type | Required | Web | Mobile | Category |
|---|---|---|---|---|---|
| Тип газової турбіни | Dropdown | No | Yes | Yes | Simple / Combined |
| Стан камери згоряння | Dropdown + Text | No | Yes | Yes | Overheating / Deposits / Color |
| Огляд лопаток газової частини | Dropdown + Text | No | Yes | Yes | Erosion / Corrosion / Cracks |
| Стан системи подачі палива | Dropdown + Text | No | Yes | Yes | Leaks / Filters / Indicators |
| Стан повітрозабору і фільтрів | Dropdown + Text | No | Yes | Yes | Contamination / Pressure Drop |

---

## Control & Protection Fields

**Visibility Logic**: Show for both Steam and Gas turbines

| Field Name | Type | Required | Web | Mobile | Category |
|---|---|---|---|---|---|
| Тип системи керування | Dropdown | No | Yes | Yes | DCS / PLC / Other |
| Виробник системи керування | Text | No | Yes | Yes | GE / Siemens / etc. |
| Наявність активних аварій | Yes/No | Yes | Yes | Yes | Current alarm status |
| Список кодів аварій | Text | No | Yes | Yes | If alarms exist |
| Перевірка захистів | Dropdown | No | Yes | Yes | Overspeed / Vibration / Temp |
| Наявність протоколу випробувань | Yes/No | No | Yes | Yes | Last test date available |
| Дата останніх випробувань | Date | No | Yes | Yes | Protection test date |

---

## Media Metadata

**Purpose**: Track photos and videos for inspection evidence

| Field Name | Type | Required | Web | Mobile | Category |
|---|---|---|---|---|---|
| Media ID | UUID | Yes | Yes | Yes | Unique identifier |
| Тип медіа | Dropdown | Yes | No | Yes | Photo / Video |
| Категорія | Dropdown | Yes | No | Yes | General / Node / Defect / Label |
| Прив'язаний вузол | Dropdown | No | Yes | Yes | Which node photographed |
| Прив'язаний дефект | Link/ID | No | Yes | Yes | Which defect referenced |
| Опис/ярлик | Text | No | Yes | Yes | Brief description |
| Дата/час зйомки | DateTime | Yes | No | Yes | Photo timestamp |
| GPS | Coordinates | No | No | Yes | Location metadata |
| Статус синхронізації | Dropdown | Yes | No | Yes | Pending / Synced / Failed |

---

## Field Addition Process (How to Extend v0.1)

### Goal: Preserve Base Structure While Adding New Fields

1. **New Field Proposal**
   - Create an Issue in GitHub with label `enhancement: new-form-field`
   - Describe:
     - Field name & purpose
     - Type (Text, Number, Dropdown, etc.)
     - Which turbine type (Steam / Gas / Both / Control)
     - Required? Yes/No
     - Web or Mobile or Both?

2. **GitHub Project Integration**
   - Add item to [GitHub Project](https://github.com/users/romanchaa997/projects/9)
   - Track status: Proposed → Approved → Implemented → Tested
   - Link to GitHub Issues/PRs

3. **Documentation Update**
   - Add new field to appropriate section (Steam-specific, Gas-specific, or Control)
   - Update version in this file (v0.1 → v0.2, etc.)
   - Create pull request with field changes

4. **Implementation**
   - Code changes in separate branch
   - Form validation & UI logic
   - Mobile + Web compatibility

5. **Testing & Merge**
   - Unit tests for new field logic
   - Integration tests with existing fields
   - Merge to main branch

---

## Repository Structure

```
Audityzer/
├── docs/
│   ├── TURBINE_INSPECTION_FORM_v0.1.md (this file)
│   ├── FIELD_ADDITIONS.md (field extension examples)
│   └── API_SPEC.md (if applicable)
├── src/
│   ├── forms/
│   │   └── turbine-inspection/ (web form logic)
│   └── mobile/
│       └── turbine-inspection/ (mobile client logic)
├── tests/
│   └── turbine-inspection/ (validation tests)
└── README.md (main project docs)
```

---

## GitHub Projects Board

**URL**: https://github.com/users/romanchaa997/projects/9

**Columns**:
1. **📝 Proposed** - New field ideas (Issues)
2. **👀 Review** - Fields under review
3. **🔧 In Development** - Currently being implemented
4. **🧪 Testing** - Field validation phase
5. **✅ Done** - Fields merged and live

**Using the Board**:
- Drag items between columns as they progress
- Link to GitHub Issues for each field
- Attach PRs when implementation starts
- Add comment notes for technical details

---

## Example: Adding a New Field

### Scenario: Add "Insulation Resistance" field for Steam Turbines

**Step 1**: Create Issue
```
Title: [Enhancement] Add Insulation Resistance Field for Steam Turbines
Labels: enhancement, steam-turbine, v0.2
Body:
- Field: Insulation Resistance (Ω)
- Type: Number + Unit dropdown
- Category: Steam-specific
- Mobile: Yes
- Web: Yes
- Required: No
- Purpose: Measure electrical insulation health of windings
```

**Step 2**: Add to Project Board
- Create item in GitHub Project
- Set status: Proposed
- Link Issue #123

**Step 3**: Implementation PR
```
Title: Add Insulation Resistance field for Steam turbines (v0.2)
Linked Issue: #123
Changes:
- Update TURBINE_INSPECTION_FORM_v0.1.md
- Add field to Steam-specific section
- Update form validation schema
- Add mobile UI component
```

**Step 4**: Merge & Release
- After PR merge, update version → v0.2
- Move GitHub Project item to "Done"
- Update this documentation

---

## Contact & Contributions

- **Repository**: [github.com/romanchaa997/Audityzer](https://github.com/romanchaa997/Audityzer)
- **Issues**: [GitHub Issues](https://github.com/romanchaa997/Audityzer/issues)
- **Project Board**: [Turbine Inspection Form v0.1](https://github.com/users/romanchaa997/projects/9)
- **Discussions**: [GitHub Discussions](https://github.com/romanchaa997/Audityzer/discussions)

---

**Last Updated**: 2026-01-03  
**Created**: 2026-01-03

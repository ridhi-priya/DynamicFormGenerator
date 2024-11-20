# Dynamic Form Generator

A powerful, real-time form generator that creates beautiful forms from JSON schemas. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🔄 Real-time form preview
- ✨ Beautiful, responsive UI
- 📝 Monaco Editor for JSON editing
- 🎯 TypeScript support
- 🎨 Tailwind CSS styling
- 🚀 Vite for fast development

## Getting Started

### Prerequisites

- Node.js 18+(v20.18.0) installed
- npm or yarn package manager

### Installation from github 

1. Clone the repository (https://github.com/ridhi-priya/DynamicFormGenerator)
2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run unit tests:
```bash
npm run test
```

Run E2E tests:
```bash
npm run test:e2e
```

## JSON Schema Format

The form generator accepts a JSON schema in the following format:

```json
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    },
    {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
    }
  ]
}
```

### Field Types

The following field types are supported:

- `text`: Basic text input
- `email`: Email input with validation
- `select`: Dropdown select with options
- `radio`: Radio button group
- `textarea`: Multi-line text input

### Field Properties

| Property      | Type     | Description                                       |
|---------------|----------|---------------------------------------------------|
| `id`          | string   | Unique identifier for the field                   |
| `type`        | string   | Field type (text, email, select, radio, textarea) |
| `label`       | string   | Label displayed above the field                   |
| `required`    | boolean  | Whether the field is required                     |
| `placeholder` | string?  | Placeholder text (optional)                       |
| `validation`  | object?  | Custom validation rules (optional)                |
| `options`     | array?   | Options for select/radio fields (optional)        |


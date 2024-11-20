import  { useState } from 'react';
import { JsonEditor } from './components/JsonEditor';
import { DynamicForm } from './components/DynamicForm';
import { ThemeToggle } from './components/ThemeToggle';
import { FormSchema } from './types/schema';
import { Toaster } from 'sonner';
import { Split, Code2 } from 'lucide-react';

const defaultSchema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address"
      }
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" }
      ]
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" }
      ]
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share..."
    }
  ]
};

function App() {
  const [jsonValue, setJsonValue] = useState<string>(
    JSON.stringify(defaultSchema, null, 2)
  );
  const [error, setError] = useState<string>();
  const [schema, setSchema] = useState<FormSchema>(defaultSchema);

  const handleJsonChange = (value: string) => {
    setJsonValue(value);
    try {
      const parsed = JSON.parse(value);
      setSchema(parsed);
      setError(undefined);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="border-b bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 dark:text-gray-200" />
              <h1 className="text-xl font-bold dark:text-white">Dynamic Form Generator</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Split className="h-5 w-5 dark:text-gray-200" />
              <h2 className="text-lg font-semibold dark:text-white">JSON Schema Editor</h2>
            </div>
            <div className="h-[calc(100vh-220px)]">
              <JsonEditor
                value={jsonValue}
                onChange={handleJsonChange}
                error={error}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700">
            {!error && <DynamicForm schema={schema} />}
          </div>
        </div>
      </main>
      <Toaster position="top-right" theme="system" />
    </div>
  );
}

export default App;
import React from 'react';
import Editor from "@monaco-editor/react";
import { AlertCircle } from 'lucide-react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, error }) => {
  return (
    <div className="h-full">
      <div className="bg-gray-900 rounded-lg p-4 h-full">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={value}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-2 text-red-500">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
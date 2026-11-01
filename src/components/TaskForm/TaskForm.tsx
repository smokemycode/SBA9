import { useState } from 'react';
import type { Task, TaskFormData } from '../../types';
import { validateTaskForm } from '../../utils/taskUtils';

interface TaskFormProps {
    onAdd: (task: Task) => void;
    generateId: () => string;
}

const emptyFormData: TaskFormData = {
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: "",
};

export default function TaskForm({ onAdd, generateId }: TaskFormProps) {
    const [form, setForm] = useState<TaskFormData>(emptyFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        const next = { ...form, [name]: value };
        setForm(next);
        if (submitted) setErrors(validateTaskForm(next));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        const validation = validateTaskForm(form);
        setErrors(validation);
        if (Object.keys(validation).length > 0) return;

        onAdd({
            ...form,
            id: generateId(),
            createdAt: new Date().toISOString(),
        });
        setForm(emptyFormData);
        setErrors({});
        setSubmitted(false);
    }

    return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow space-y-3 transition-colors"
      noValidate
    >
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        Add a Task
      </h2>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Title *
        </label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mt-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          placeholder="What do you need to do?"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={2}
          className="w-full p-2 mt-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          placeholder="Optional details"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Priority
          </label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Due date *
          </label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 mt-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors"
      >
        Add Task
      </button>
    </form>
  );
}
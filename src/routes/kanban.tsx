import { createAsync, revalidate } from '@solidjs/router';
import { createSignal, For, Show } from 'solid-js';
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  createDroppable,
  closestCenter,
} from '@thisbeyond/solid-dnd';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { TextField, TextFieldInput, TextFieldLabel } from '~/components/ui/text-field';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import ProtectedRoute from '~/components/protected-route';
import { getKanbanData, createKanbanTask, moveKanbanTask, deleteKanbanTask, type KanbanTaskInput } from '~/lib/db';
import { toast } from 'solid-sonner';

// Priority options for select
const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

// Label options
const LABEL_OPTIONS = [
  { value: 'Design', label: 'Design' },
  { value: 'Backend', label: 'Backend' },
  { value: 'Frontend', label: 'Frontend' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Testing', label: 'Testing' },
  { value: 'Security', label: 'Security' },
];

// Column colors
const COLUMN_COLORS: Record<string, string> = {
  'todo': 'bg-slate-500',
  'in-progress': 'bg-blue-500',
  'review': 'bg-amber-500',
  'done': 'bg-green-500',
};

// Priority badge styles
const priorityStyles: Record<string, string> = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

// Label colors
const labelColors: Record<string, string> = {
  'Design': 'bg-purple-100 text-purple-700',
  'Backend': 'bg-blue-100 text-blue-700',
  'Frontend': 'bg-cyan-100 text-cyan-700',
  'DevOps': 'bg-orange-100 text-orange-700',
  'Testing': 'bg-pink-100 text-pink-700',
  'Security': 'bg-red-100 text-red-700',
};

interface Task {
  id: string;
  title: string;
  description: string | null;
  column_id: string;
  position: number;
  priority: string;
  label: string | null;
  assignee: string | null;
  due_date: string | null;
  progress: number;
}

// Task Card Component
const TaskCard = (props: { task: Task; onDelete: (id: string) => void }) => {
  const sortable = createSortable(props.task.id);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = () => {
    if (!props.task.due_date) return false;
    return new Date(props.task.due_date) < new Date() && props.task.progress < 100;
  };

  return (
    <div
      use:sortable
      class="touch-none"
      classList={{ 'opacity-50': sortable.isActiveDragging }}
    >
      <Card class="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow border-l-4"
        style={{ 'border-left-color': props.task.priority === 'high' ? '#ef4444' : props.task.priority === 'medium' ? '#f59e0b' : '#22c55e' }}
      >
        <CardContent class="p-4 space-y-3">
          {/* Header with labels */}
          <div class="flex items-start justify-between gap-2">
            <div class="flex flex-wrap gap-1.5">
              <Show when={props.task.label}>
                <span class={`text-xs px-2 py-0.5 rounded-full font-medium ${labelColors[props.task.label!] || 'bg-gray-100 text-gray-700'}`}>
                  {props.task.label}
                </span>
              </Show>
              <span class={`text-xs px-2 py-0.5 rounded-full border font-medium ${priorityStyles[props.task.priority] || priorityStyles.medium}`}>
                {props.task.priority}
              </span>
            </div>
            <button
              class="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                props.onDelete(props.task.id);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <h3 class="font-medium text-sm leading-tight">{props.task.title}</h3>

          {/* Description */}
          <Show when={props.task.description}>
            <p class="text-xs text-muted-foreground line-clamp-2">{props.task.description}</p>
          </Show>

          {/* Progress bar */}
          <Show when={props.task.progress > 0}>
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-muted-foreground">Progress</span>
                <span class="font-medium">{props.task.progress}%</span>
              </div>
              <div class="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  class="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${props.task.progress}%` }}
                />
              </div>
            </div>
          </Show>

          {/* Footer with assignee and due date */}
          <div class="flex items-center justify-between pt-1">
            <Show when={props.task.assignee}>
              <div class="flex items-center gap-1.5">
                <div class="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {props.task.assignee}
                </div>
              </div>
            </Show>
            <Show when={props.task.due_date}>
              <div class={`flex items-center gap-1 text-xs ${isOverdue() ? 'text-red-600' : 'text-muted-foreground'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{formatDate(props.task.due_date)}</span>
              </div>
            </Show>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Column Component
const Column = (props: { column: any; onAddTask: (columnId: string) => void; onDeleteTask: (id: string) => void }) => {
  const droppable = createDroppable(props.column.id);

  return (
    <div class="flex-shrink-0 w-80">
      <div class="rounded-lg bg-muted/50 p-4 h-full flex flex-col">
        {/* Column Header */}
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class={`w-3 h-3 rounded-full ${COLUMN_COLORS[props.column.id] || 'bg-gray-500'}`} />
            <h2 class="font-semibold text-sm">{props.column.title}</h2>
            <Badge variant="secondary" class="text-xs px-2 py-0.5 rounded-full">
              {props.column.tasks.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="h-8 w-8 p-0"
            onClick={() => props.onAddTask(props.column.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Button>
        </div>

        {/* Tasks Container */}
        <div
          use:droppable
          class="flex-1 space-y-3 min-h-[200px] overflow-y-auto"
          classList={{ 'bg-primary/5 rounded-lg': droppable.isActiveDroppable }}
        >
          <SortableProvider ids={props.column.tasks.map((t: Task) => t.id)}>
            <For each={props.column.tasks}>
              {(task: Task) => (
                <div class="group">
                  <TaskCard task={task} onDelete={props.onDeleteTask} />
                </div>
              )}
            </For>
          </SortableProvider>

          <Show when={props.column.tasks.length === 0}>
            <div class="flex items-center justify-center h-24 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
              No tasks yet
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

// Add Task Dialog Component
const AddTaskDialog = (props: {
  open: boolean;
  columnId: string | null;
  columnTitle: string;
  onClose: () => void;
  onSubmit: (task: KanbanTaskInput) => void;
}) => {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');
  const [priority, setPriority] = createSignal<'low' | 'medium' | 'high'>('medium');
  const [label, setLabel] = createSignal('');
  const [assignee, setAssignee] = createSignal('');
  const [dueDate, setDueDate] = createSignal('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!title().trim()) {
      toast.error('Please enter a task title');
      return;
    }

    props.onSubmit({
      title: title(),
      description: description() || undefined,
      priority: priority(),
      label: label() || undefined,
      assignee: assignee() || undefined,
      due_date: dueDate() || undefined,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setLabel('');
    setAssignee('');
    setDueDate('');
  };

  return (
    <Dialog open={props.open} onOpenChange={(open) => !open && props.onClose()}>
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task to {props.columnTitle}</DialogTitle>
          <DialogDescription>Create a new task for your board</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} class="space-y-4">
          <TextField>
            <TextFieldLabel>Title *</TextFieldLabel>
            <TextFieldInput
              value={title()}
              onInput={(e) => setTitle(e.currentTarget.value)}
              placeholder="Enter task title"
            />
          </TextField>

          <TextField>
            <TextFieldLabel>Description</TextFieldLabel>
            <textarea
              class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={description()}
              onInput={(e) => setDescription(e.currentTarget.value)}
              placeholder="Enter task description"
            />
          </TextField>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium">Priority</label>
              <Select
                value={PRIORITY_OPTIONS.find(o => o.value === priority())}
                onChange={(option) => option && setPriority(option.value as 'low' | 'medium' | 'high')}
                options={PRIORITY_OPTIONS}
                optionValue="value"
                optionTextValue="label"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
                )}
              >
                <SelectTrigger>
                  <SelectValue<typeof PRIORITY_OPTIONS[0]>>
                    {(state) => state.selectedOption()?.label ?? 'Select priority'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium">Label</label>
              <Select
                value={LABEL_OPTIONS.find(o => o.value === label())}
                onChange={(option) => setLabel(option?.value || '')}
                options={LABEL_OPTIONS}
                optionValue="value"
                optionTextValue="label"
                itemComponent={(props) => (
                  <SelectItem item={props.item}>{props.item.rawValue.label}</SelectItem>
                )}
              >
                <SelectTrigger>
                  <SelectValue<typeof LABEL_OPTIONS[0]>>
                    {(state) => state.selectedOption()?.label ?? 'Select label'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent />
              </Select>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <TextField>
              <TextFieldLabel>Assignee (Initials)</TextFieldLabel>
              <TextFieldInput
                value={assignee()}
                onInput={(e) => setAssignee(e.currentTarget.value.toUpperCase().slice(0, 2))}
                placeholder="e.g. JD"
                maxLength={2}
              />
            </TextField>

            <TextField>
              <TextFieldLabel>Due Date</TextFieldLabel>
              <TextFieldInput
                type="date"
                value={dueDate()}
                onInput={(e) => setDueDate(e.currentTarget.value)}
              />
            </TextField>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={props.onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Main Kanban Board Component
export default function KanbanBoard() {
  const kanbanData = createAsync(() => getKanbanData());
  const [activeTask, setActiveTask] = createSignal<Task | null>(null);
  const [addDialogOpen, setAddDialogOpen] = createSignal(false);
  const [addDialogColumn, setAddDialogColumn] = createSignal<{ id: string; title: string } | null>(null);

  const openAddDialog = (columnId: string) => {
    const column = kanbanData()?.find(c => c.id === columnId);
    if (column) {
      setAddDialogColumn({ id: columnId, title: column.title });
      setAddDialogOpen(true);
    }
  };

  const handleAddTask = async (task: KanbanTaskInput) => {
    const columnId = addDialogColumn()?.id;
    if (!columnId) return;

    try {
      await createKanbanTask(columnId, task);
      toast.success('Task created successfully');
      setAddDialogOpen(false);
      window.location.reload();
    } catch (error) {
      toast.error('Failed to create task');
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteKanbanTask(taskId);
      toast.success('Task deleted');
      window.location.reload();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const onDragStart = ({ draggable }: any) => {
    const task = findTask(draggable.id);
    setActiveTask(task);
  };

  const onDragEnd = async ({ draggable, droppable }: any) => {
    if (draggable && droppable) {
      const fromColumn = findColumnByTaskId(draggable.id);
      let toColumnId = droppable.id.startsWith('task-')
        ? findColumnByTaskId(droppable.id)?.id
        : droppable.id;

      if (fromColumn && toColumnId && fromColumn.id !== toColumnId) {
        try {
          await moveKanbanTask(draggable.id, fromColumn.id, toColumnId);
          toast.success('Task moved');
          window.location.reload();
        } catch (error) {
          toast.error('Failed to move task');
        }
      }
    }
    setActiveTask(null);
  };

  const findTask = (taskId: string): Task | null => {
    const data = kanbanData();
    if (!data) return null;
    for (const column of data) {
      const task = column.tasks.find((t: Task) => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (taskId: string) => {
    const data = kanbanData();
    if (!data) return null;
    return data.find(col => col.tasks.some((t: Task) => t.id === taskId));
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-6 p-6">
        {/* Header */}
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Kanban Board</h1>
            <p class="text-muted-foreground">Manage and track your project tasks</p>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <Show when={kanbanData()}>
          <DragDropProvider
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetector={closestCenter}
          >
            <DragDropSensors />

            <div class="flex gap-6 overflow-x-auto pb-4">
              <For each={kanbanData()}>
                {(column) => (
                  <Column
                    column={column}
                    onAddTask={openAddDialog}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </For>
            </div>

            <DragOverlay>
              <Show when={activeTask()}>
                <div class="w-80 opacity-90">
                  <Card class="shadow-xl border-l-4"
                    style={{ 'border-left-color': activeTask()!.priority === 'high' ? '#ef4444' : activeTask()!.priority === 'medium' ? '#f59e0b' : '#22c55e' }}
                  >
                    <CardContent class="p-4">
                      <h3 class="font-medium text-sm">{activeTask()!.title}</h3>
                      <Show when={activeTask()!.description}>
                        <p class="text-xs text-muted-foreground mt-1 line-clamp-2">{activeTask()!.description}</p>
                      </Show>
                    </CardContent>
                  </Card>
                </div>
              </Show>
            </DragOverlay>
          </DragDropProvider>
        </Show>

        {/* Add Task Dialog */}
        <AddTaskDialog
          open={addDialogOpen()}
          columnId={addDialogColumn()?.id || null}
          columnTitle={addDialogColumn()?.title || ''}
          onClose={() => setAddDialogOpen(false)}
          onSubmit={handleAddTask}
        />
      </div>
    </ProtectedRoute>
  );
}

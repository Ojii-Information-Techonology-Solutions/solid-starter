import { createSignal, For, Show } from 'solid-js';
import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
  SortableProvider,
  createSortable,
  closestCenter,
} from '@thisbeyond/solid-dnd';
import { TextField } from '~/components/ui/text-field';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import ProtectedRoute from '~/components/protected-route';

const SortableTask = (props) => {
  const sortable = createSortable(props.task.id);

  return (
    <div
      use:sortable
      class="mb-2 touch-none"
    >
      <Card class={`cursor-grab active:cursor-grabbing transition-all ${sortable.isActiveDragging ? 'opacity-50' : ''}`}>
        <CardContent class="p-4">
          <h3 class="font-medium text-sm mb-1">{props.task.title}</h3>
          <Show when={props.task.description}>
            <p class="text-xs text-muted-foreground">{props.task.description}</p>
          </Show>
        </CardContent>
      </Card>
    </div>
  );
};

const Column = (props) => {
  const [isAddingTask, setIsAddingTask] = createSignal(false);
  const [newTaskTitle, setNewTaskTitle] = createSignal('');
  const [newTaskDesc, setNewTaskDesc] = createSignal('');

  const handleAddTask = () => {
    if (newTaskTitle().trim()) {
      props.onAddTask(props.column.id, {
        id: `task-${Date.now()}`,
        title: newTaskTitle(),
        description: newTaskDesc(),
      });
      setNewTaskTitle('');
      setNewTaskDesc('');
      setIsAddingTask(false);
    }
  };

  return (
    <div class="flex-shrink-0 w-80">
      <Card class="h-full flex flex-col">
        <CardHeader class="pb-3">
          <CardTitle class="text-lg flex items-center justify-between">
            <span>{props.column.title}</span>
            <span class="text-sm font-normal text-muted-foreground">
              {props.column.tasks.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent class="flex-1 overflow-y-auto">
          <SortableProvider ids={props.column.tasks.map(t => t.id)}>
            <div class="space-y-2 min-h-[100px]">
              <For each={props.column.tasks}>
                {(task) => <SortableTask task={task} />}
              </For>
            </div>
          </SortableProvider>

          <Show
            when={isAddingTask()}
            fallback={
              <Button
                variant="ghost"
                class="w-full mt-2 justify-start"
                onClick={() => setIsAddingTask(true)}
              >
                + Add task
              </Button>
            }
          >
            <div class="mt-2 space-y-2">
              <TextField
                placeholder="Task title"
                value={newTaskTitle()}
                onInput={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              />
              <TextField
                placeholder="Description (optional)"
                value={newTaskDesc()}
                onInput={(e) => setNewTaskDesc(e.target.value)}
              />
              <div class="flex gap-2">
                <Button size="sm" onClick={handleAddTask}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                    setNewTaskDesc('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Show>
        </CardContent>
      </Card>
    </div>
  );
};

export default function KanbanBoard() {
  const [columns, setColumns] = createSignal([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Design new landing page', description: 'Create wireframes and mockups' },
        { id: 'task-2', title: 'Set up database schema', description: 'PostgreSQL tables for users and projects' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'Implement authentication', description: 'OAuth and JWT tokens' },
      ],
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        { id: 'task-4', title: 'Code review API endpoints', description: 'Check for security issues' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-5', title: 'Project setup', description: 'Initialize repository and CI/CD' },
      ],
    },
  ]);

  const [activeTask, setActiveTask] = createSignal(null);

  const onDragStart = ({ draggable }) => {
    const task = findTask(draggable.id);
    setActiveTask(task);
  };

  const onDragEnd = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const fromColumn = findColumnByTaskId(draggable.id);
      const toColumnId = droppable.id.startsWith('task-')
        ? findColumnByTaskId(droppable.id)?.id
        : droppable.id;

      if (fromColumn && toColumnId) {
        moveTask(draggable.id, fromColumn.id, toColumnId);
      }
    }
    setActiveTask(null);
  };

  const findTask = (taskId) => {
    for (const column of columns()) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const findColumnByTaskId = (taskId) => {
    return columns().find(col => col.tasks.some(t => t.id === taskId));
  };

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    if (fromColumnId === toColumnId) return;

    setColumns(cols => {
      const newCols = cols.map(col => ({ ...col, tasks: [...col.tasks] }));
      const fromCol = newCols.find(c => c.id === fromColumnId);
      const toCol = newCols.find(c => c.id === toColumnId);

      const taskIndex = fromCol.tasks.findIndex(t => t.id === taskId);
      if (taskIndex > -1) {
        const [task] = fromCol.tasks.splice(taskIndex, 1);
        toCol.tasks.push(task);
      }

      return newCols;
    });
  };

  const addTask = (columnId, task) => {
    setColumns(cols => cols.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, task] }
        : col
    ));
  };

  return (
    <ProtectedRoute>
      <div class="flex flex-1 flex-col gap-4 p-4">

          <h1 class="text-4xl font-bold mb-8 text-slate-900">Project Board</h1>

          <DragDropProvider
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetector={closestCenter}
          >
            <DragDropSensors />

            <div class="flex gap-4 overflow-x-auto pb-4">
              <For each={columns()}>
                {(column) => (
                  <Column
                    column={column}
                    onAddTask={addTask}
                  />
                )}
              </For>
            </div>

            <DragOverlay>
              <Show when={activeTask()}>
                <Card class="w-80 cursor-grabbing opacity-90 shadow-xl">
                  <CardContent class="p-4">
                    <h3 class="font-medium text-sm mb-1">{activeTask().title}</h3>
                    <Show when={activeTask().description}>
                      <p class="text-xs text-muted-foreground">{activeTask().description}</p>
                    </Show>
                  </CardContent>
                </Card>
              </Show>
            </DragOverlay>
          </DragDropProvider>

      </div>
    </ProtectedRoute>
  );
}
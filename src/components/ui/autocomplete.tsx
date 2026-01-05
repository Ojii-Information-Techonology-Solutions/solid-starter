import { createSignal, createEffect, For, Show, onCleanup, type JSX } from "solid-js"
import { cn } from "~/lib/utils"

export type AutocompleteItem = {
  value: string | number
  label: string
  [key: string]: unknown
}

type AutocompleteProps<T extends AutocompleteItem> = {
  /** Static list of options */
  options?: T[]
  /** Async search function - called when input changes */
  onSearch?: (query: string) => Promise<T[]>
  /** Called when an item is selected */
  onSelect?: (item: T) => void
  /** Called when the input value changes */
  onInputChange?: (value: string) => void
  /** Placeholder text */
  placeholder?: string
  /** Debounce delay in ms for async search (default: 300) */
  debounce?: number
  /** Minimum characters before searching (default: 1) */
  minChars?: number
  /** Show loading indicator */
  loading?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Custom class for the container */
  class?: string
  /** Custom class for the input */
  inputClass?: string
  /** Custom render function for items */
  renderItem?: (item: T) => JSX.Element
  /** Label for the field */
  label?: string
  /** Description text */
  description?: string
  /** Error message */
  error?: string
  /** Initial/controlled value */
  value?: string
  /** No results message */
  emptyMessage?: string
}

export function Autocomplete<T extends AutocompleteItem>(props: AutocompleteProps<T>) {
  const [inputValue, setInputValue] = createSignal(props.value || "")
  const [isOpen, setIsOpen] = createSignal(false)
  const [results, setResults] = createSignal<T[]>([])
  const [isLoading, setIsLoading] = createSignal(false)
  const [highlightedIndex, setHighlightedIndex] = createSignal(-1)

  let inputRef: HTMLInputElement | undefined
  let containerRef: HTMLDivElement | undefined
  let debounceTimer: ReturnType<typeof setTimeout> | undefined

  const minChars = () => props.minChars ?? 1
  const debounceDelay = () => props.debounce ?? 300

  // Filter static options
  const filterOptions = (query: string): T[] => {
    if (!props.options) return []
    const lowerQuery = query.toLowerCase()
    return props.options.filter(item =>
      item.label.toLowerCase().includes(lowerQuery)
    )
  }

  // Handle input change
  const handleInput = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    setInputValue(value)
    props.onInputChange?.(value)
    setHighlightedIndex(-1)

    if (value.length < minChars()) {
      setResults([])
      setIsOpen(false)
      return
    }

    // Clear previous debounce
    if (debounceTimer) clearTimeout(debounceTimer)

    if (props.onSearch) {
      // Async search mode
      setIsLoading(true)
      debounceTimer = setTimeout(async () => {
        try {
          const searchResults = await props.onSearch!(value)
          setResults(searchResults)
          setIsOpen(true)
        } catch (error) {
          console.error("Autocomplete search error:", error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      }, debounceDelay())
    } else if (props.options) {
      // Static filter mode
      const filtered = filterOptions(value)
      setResults(filtered)
      setIsOpen(filtered.length > 0)
    }
  }

  // Handle item selection
  const selectItem = (item: T) => {
    setInputValue(item.label)
    setIsOpen(false)
    setHighlightedIndex(-1)
    props.onSelect?.(item)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    const items = results()

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        if (!isOpen() && inputValue().length >= minChars()) {
          setIsOpen(true)
        } else {
          setHighlightedIndex(prev =>
            prev < items.length - 1 ? prev + 1 : 0
          )
        }
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev > 0 ? prev - 1 : items.length - 1
        )
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex() >= 0 && items[highlightedIndex()]) {
          selectItem(items[highlightedIndex()])
        }
        break
      case "Escape":
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
      case "Tab":
        setIsOpen(false)
        break
    }
  }

  // Handle focus
  const handleFocus = () => {
    if (inputValue().length >= minChars() && results().length > 0) {
      setIsOpen(true)
    }
  }

  // Handle click outside
  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef && !containerRef.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }

  createEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    onCleanup(() => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (debounceTimer) clearTimeout(debounceTimer)
    })
  })

  // Sync with controlled value
  createEffect(() => {
    if (props.value !== undefined) {
      setInputValue(props.value)
    }
  })

  const defaultRenderItem = (item: T) => (
    <span>{item.label}</span>
  )

  return (
    <div ref={containerRef} class={cn("relative w-full", props.class)}>
      <Show when={props.label}>
        <label class="text-sm font-medium leading-none mb-1.5 block">
          {props.label}
        </label>
      </Show>

      <div class="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue()}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={props.placeholder}
          disabled={props.disabled}
          class={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            props.error && "border-destructive focus-visible:ring-destructive",
            props.inputClass
          )}
        />

        <Show when={isLoading() || props.loading}>
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              class="size-4 animate-spin text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </Show>
      </div>

      <Show when={props.description && !props.error}>
        <p class="text-sm text-muted-foreground mt-1.5">{props.description}</p>
      </Show>

      <Show when={props.error}>
        <p class="text-sm text-destructive mt-1.5">{props.error}</p>
      </Show>

      <Show when={isOpen()}>
        <div class="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <Show
            when={results().length > 0}
            fallback={
              <div class="px-3 py-6 text-center text-sm text-muted-foreground">
                {props.emptyMessage || "No results found"}
              </div>
            }
          >
            <ul class="max-h-60 overflow-auto p-1">
              <For each={results()}>
                {(item, index) => (
                  <li
                    class={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                      "hover:bg-accent hover:text-accent-foreground",
                      highlightedIndex() === index() && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => selectItem(item)}
                    onMouseEnter={() => setHighlightedIndex(index())}
                  >
                    {props.renderItem ? props.renderItem(item) : defaultRenderItem(item)}
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default Autocomplete

import type { Component, ComponentProps, JSX } from "solid-js"
import { splitProps } from "solid-js"

import { cn } from "~/lib/utils"

const Timeline: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return <div class={cn("relative", local.class)} {...others} />
}

const TimelineItem: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("relative flex gap-4 pb-8 last:pb-0", local.class)}
      {...others}
    />
  )
}

const TimelineConnector: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn(
        "absolute left-[15px] top-8 h-[calc(100%-32px)] w-[2px] bg-border",
        local.class
      )}
      {...others}
    />
  )
}

type TimelineIconProps = ComponentProps<"div"> & {
  variant?: "default" | "success" | "warning" | "error" | "info"
}

const TimelineIcon: Component<TimelineIconProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "variant", "children"])

  const variantClasses = {
    default: "bg-primary text-primary-foreground",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  }

  return (
    <div
      class={cn(
        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-background",
        variantClasses[local.variant || "default"],
        local.class
      )}
      {...others}
    >
      {local.children}
    </div>
  )
}

const TimelineContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <div
      class={cn("flex-1 pt-1", local.class)}
      {...others}
    />
  )
}

const TimelineTitle: Component<ComponentProps<"h3">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <h3
      class={cn("font-semibold leading-none tracking-tight", local.class)}
      {...others}
    />
  )
}

const TimelineDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <p
      class={cn("mt-1 text-sm text-muted-foreground", local.class)}
      {...others}
    />
  )
}

const TimelineTime: Component<ComponentProps<"time">> = (props) => {
  const [local, others] = splitProps(props, ["class"])
  return (
    <time
      class={cn("text-xs text-muted-foreground", local.class)}
      {...others}
    />
  )
}

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
}

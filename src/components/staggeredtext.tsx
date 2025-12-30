// components/StaggeredText.tsx
import { For } from "solid-js";

export default function StaggeredText(props: { text: string; class?: string }) {
  const words = props.text.split(" ");

  return (
    <span class={`flex flex-wrap gap-x-[0.3em] ${props.class}`}>
      <For each={words}>
        {(word, i) => (
          <span 
            class="stagger-item inline-block" 
            style={{ "animation-delay": `${i() * 0.1}s` }}
          >
            {word}
          </span>
        )}
      </For>
    </span>
  );
}
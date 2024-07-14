import { component$, Slot } from "@builder.io/qwik";

export default component$((props: Record<string, any>) => {
  return (
    <button
      class={
        "rounded border border-indigo-900 px-2 py-1 transition-all duration-300 hover:bg-indigo-900/5 active:font-bold" +
        " " +
        (props.class || "")
      }
      {...props}
    >
      <Slot />
    </button>
  );
});

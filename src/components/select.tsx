import { component$, Slot } from "@builder.io/qwik";

export default component$((props: Record<string, any>) => {
  return (
    <div>
      <select
        {...props}
        class={
          "w-full min-w-[5rem] rounded border border-indigo-900 bg-transparent p-1 text-center underline" +
          " " +
          (props.error && "border-red-700") +
          " " +
          props.class
        }
      >
        <Slot />
      </select>
      {props.error && (
        <span class={"text-red-700"}>
          <small>
            <i>{props.error}</i>
          </small>
        </span>
      )}
    </div>
  );
});

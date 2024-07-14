import { component$ } from "@builder.io/qwik";

export default component$((props: Record<string, any>) => {
  return (
    <div>
      <input
        {...props}
        class={
          "w-full rounded-t border-b border-indigo-900 bg-transparent px-2 py-1.5 " +
          (props.error && "border-b-red-700")
        }
      />
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

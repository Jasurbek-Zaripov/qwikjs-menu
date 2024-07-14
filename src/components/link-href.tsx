import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export default component$((props: Record<string, any>) => {
  return (
    <Link
      class={
        "my-sh rounded p-1 px-1.5 underline hover:border-indigo-900 active:font-bold " +
        (props.class || "")
      }
      {...props}
    >
      <Slot />
    </Link>
  );
});

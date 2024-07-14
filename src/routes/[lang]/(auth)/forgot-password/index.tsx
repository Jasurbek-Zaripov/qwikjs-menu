import { component$ } from "@builder.io/qwik";
import { routeAction$, Form, zod$ } from "@builder.io/qwik-city";
import Input from "~/components/input";
import Button from "~/components/button";
import { LangEnum } from "~/config/config";
import { getI18nText } from "~/routes/[lang]/(auth)/layout";

export const useForgotPasswordForm = routeAction$(
  async (data) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1",
    );
    return await response.json();
  },
  zod$((z, ev) => {
    const lang = ev.params.lang as LangEnum;

    return z.object({
      email: z.string().email(getI18nText("email", lang, "email")),
    });
  }),
);

// FORGOT PASSWORD
export default component$(() => {
  const signInForm = useForgotPasswordForm();

  return (
    <Form action={signInForm} class="flex flex-col gap-2">
      <Input
        type="text"
        name="email"
        placeholder="Email"
        error={signInForm.value?.fieldErrors?.email}
      />
      <Button role="submit">Send</Button>
    </Form>
  );
});

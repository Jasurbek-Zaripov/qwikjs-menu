import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  Form,
  zod$,
  useNavigate,
  useLocation,
} from "@builder.io/qwik-city";
import Input from "~/components/input";
import Button from "~/components/button";
import { LangEnum, BASE_URL } from "~/config/config";
import { getI18nText } from "~/routes/[lang]/(auth)/layout";
import { axiosInstance } from "~/utils.request";

export const useSignUpForm = routeAction$(
  async (body, event) => {
    const response = await axiosInstance(event.request).post(
      BASE_URL + "/auth/sign-up",
      body,
    );
    if (response.headers?.["set-cookie"]?.[0]) {
      event.headers.set("Set-Cookie", response.headers["set-cookie"][0]);
    }
    return response.data;
  },
  zod$((z, ev) => {
    const lang = ev.params.lang as LangEnum;

    return z.object({
      name: z
        .string()
        .min(3, getI18nText("name", lang, "min-3"))
        .max(20, getI18nText("name", lang, "max-20")),
      email: z.string().email(getI18nText("email", lang, "email")),
      password: z.string().min(6, getI18nText("password", lang, "min-6")),
    });
  }),
);

// Sign UP
export default component$(() => {
  const signUpForm = useSignUpForm();
  const navigator = useNavigate();
  const location = useLocation();
  return (
    <Form
      action={signUpForm}
      class="flex flex-col gap-2"
      onSubmitCompleted$={() => {
        if (signUpForm.value) {
          navigator(`/${location.params.lang}/confirm-code`);
        }
      }}
    >
      {signUpForm.value?.errors?.length && (
        <p class="text-red-700">{signUpForm.value.errors.join(";")}</p>
      )}
      <Input
        type="text"
        name="name"
        placeholder="Your name"
        error={signUpForm.value?.fieldErrors?.name}
      />
      <Input
        type="text"
        name="email"
        placeholder="Email"
        error={signUpForm.value?.fieldErrors?.email}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        error={signUpForm.value?.fieldErrors?.password}
      />
      <Button role="submit">
        Sign Up {signUpForm.isRunning && <span>loading...</span>}
      </Button>
    </Form>
  );
});

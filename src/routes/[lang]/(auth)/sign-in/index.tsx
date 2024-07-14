import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  Form,
  zod$,
  useLocation,
  useNavigate,
  server$,
} from "@builder.io/qwik-city";
import LinkHref from "~/components/link-href";
import Input from "~/components/input";
import Button from "~/components/button";
import { LangEnum } from "~/config/config";
import { getI18nText } from "~/routes/[lang]/(auth)/layout";
import { axiosInstance } from "~/utils.request";

export const useSignForm = routeAction$(
  async (body, event) => {
    try {
      const { data, headers } = await axiosInstance(event.request).post(
        "/auth/sign-in",
        body,
      );
      if (headers?.["set-cookie"]?.[0]) {
        event.headers.set("Set-Cookie", headers["set-cookie"][0]);
      }
      return data;
    } catch (e: any) {
      return e?.response?.data as { status: number; statusText: string };
    }
  },
  zod$((z, ev) => {
    const lang = ev.params.lang as LangEnum;

    return z.object({
      email: z.string().email(getI18nText("email", lang, "email")),
      password: z.string().min(6, getI18nText("password", lang, "min-6")),
    });
  }),
);

export const handleCookies = server$(function (data: Record<string, any>) {
  this.cookie.set("user", JSON.stringify(data), { path: "/", httpOnly: true });

  return true;
});

// Sign In
export default component$(() => {
  const signInForm = useSignForm();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLang = location.params.lang;

  return (
    <Form
      action={signInForm}
      class="flex flex-col gap-2"
      onSubmitCompleted$={() => {
        if (signInForm.value?.id) {
          handleCookies(signInForm.value);
          navigate(`/${location.params.lang}/branches`);
        }
      }}
    >
      {signInForm.value?.errors?.length && (
        <p class="text-red-700">{signInForm.value.errors.join(";")}</p>
      )}
      <Input
        type="text"
        name="email"
        placeholder="Email"
        error={signInForm.value?.fieldErrors?.email}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        error={signInForm.value?.fieldErrors?.password}
      />
      <LinkHref
        href={`/${currentLang}/forgot-password`}
        class="w-min whitespace-nowrap"
      >
        Forgot password ?
      </LinkHref>
      <Button role="submit">
        Login {signInForm.isRunning && <span>loading...</span>}
      </Button>
    </Form>
  );
});

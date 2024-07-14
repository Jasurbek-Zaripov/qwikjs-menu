import { component$ } from "@builder.io/qwik";
import {
  routeAction$,
  Form,
  zod$,
  useLocation,
  useNavigate,
  server$,
} from "@builder.io/qwik-city";
import Input from "~/components/input";
import Button from "~/components/button";
import { LangEnum } from "~/config/config";
import { axiosInstance } from "~/utils.request";

export const useConfirmCodeForm = routeAction$(
  async (data, { request }) => {
    try {
      data.otp = +data.otp as any;
      const response = await axiosInstance(request).post("/user/confirm", data);
      return response.data;
    } catch (e: any) {
      return e?.response?.data as { status: number; statusText: string };
    }
  },
  zod$((z, ev) => {
    const lang = ev.params.lang as LangEnum;

    return z.object({
      otp: z.string().regex(/^[1-9]\d*$/),
    });
  }),
);

export const handleCookies = server$(function (data: Record<string, any>) {
  this.cookie.set("user", JSON.stringify(data), { path: "/", httpOnly: true });

  return true;
});

// Confirm Code
export default component$(() => {
  const confirmCodeForm = useConfirmCodeForm();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Form
      action={confirmCodeForm}
      class="flex flex-col gap-2"
      onSubmitCompleted$={() => {
        if (confirmCodeForm.value?.id) {
          handleCookies(confirmCodeForm.value);
          navigate(`/${location.params.lang}/branches`);
        }
      }}
    >
      <p class="font-bold text-indigo-900">Check your email</p>
      {confirmCodeForm.value?.errors?.length && (
        <p class="text-red-700">{confirmCodeForm.value.errors.join(";")}</p>
      )}
      <Input
        type="number"
        name="otp"
        placeholder="code"
        error={confirmCodeForm.value?.fieldErrors?.otp}
      />

      <Button role="submit">
        Send {confirmCodeForm.isRunning && <span>loading...</span>}
      </Button>
    </Form>
  );
});

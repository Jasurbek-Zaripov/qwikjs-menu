import { component$, useSignal, Signal } from "@builder.io/qwik";
import Button from "~/components/button";
import { Form, ActionStore } from "@builder.io/qwik-city";
import Input from "~/components/input";
import Select from "~/components/select";

interface Prop {
  currencies: Readonly<Signal<{ [p: string]: any }>>;
  languages: Readonly<Signal<{ [p: string]: any }>>;
  action: ActionStore<any, any>;
}

export default component$((props: Prop) => {
  const modalSignal = useSignal(false);

  return (
    <>
      <div class="card flex flex-col gap-4">
        <div class="w-36">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.9009 9.85L21.4909 19.74C21.5109 20.01 21.3809 20.19 21.3109 20.27C21.2309 20.36 21.0609 20.5 20.7809 20.5H18.0509L20.2109 9.85H20.9009ZM22.0009 6L21.9909 6.02C22.0109 6.26 21.9909 6.51 21.9309 6.76L14.5609 20.29C14.3209 21.3 13.4209 22 12.3809 22H20.7809C22.0709 22 23.0909 20.91 22.9909 19.62L22.0009 6Z"
              fill="#292D32"
            />
            <path
              d="M11.4502 2.24136C11.5502 1.84136 11.3002 1.43136 10.9002 1.33136C10.5002 1.24136 10.0902 1.48136 9.99023 1.88136L9.49023 3.95136H11.0302L11.4502 2.24136Z"
              fill="#292D32"
            />
            <path
              d="M18.0509 2.20859C18.1409 1.79859 17.8809 1.40859 17.4709 1.31859C17.0709 1.22859 16.6709 1.48859 16.5809 1.89859L16.1309 3.96859H17.6709L18.0509 2.20859Z"
              fill="#292D32"
            />
            <path
              d="M21.8198 5.33141C21.4898 4.53141 20.7098 3.96141 19.7498 3.96141H17.6698L17.1098 6.55141C17.0298 6.90141 16.7198 7.14141 16.3798 7.14141C16.3298 7.14141 16.2698 7.14141 16.2198 7.12141C15.8198 7.03141 15.5598 6.63141 15.6398 6.23141L16.1298 3.95141H11.0298L10.3998 6.55141C10.3198 6.89141 10.0098 7.12141 9.66975 7.12141C9.60975 7.12141 9.54976 7.11141 9.48975 7.10141C9.08976 7.00141 8.83975 6.60141 8.93975 6.19141L9.47975 3.94141H7.44975C6.46975 3.94141 5.59975 4.58141 5.30975 5.52141L1.09975 19.0714C0.659754 20.5214 1.72975 22.0014 3.23975 22.0014H16.3798C17.4198 22.0014 18.3198 21.3014 18.5598 20.2914L21.9298 6.76141C21.9898 6.51141 22.0098 6.26141 21.9898 6.02141C21.9698 5.78141 21.9198 5.54141 21.8198 5.33141ZM14.6998 16.7514H6.69975C6.28975 16.7514 5.94975 16.4114 5.94975 16.0014C5.94975 15.5914 6.28975 15.2514 6.69975 15.2514H14.6998C15.1098 15.2514 15.4498 15.5914 15.4498 16.0014C15.4498 16.4114 15.1098 16.7514 14.6998 16.7514ZM15.6998 12.7514H7.69975C7.28975 12.7514 6.94975 12.4114 6.94975 12.0014C6.94975 11.5914 7.28975 11.2514 7.69975 11.2514H15.6998C16.1098 11.2514 16.4498 11.5914 16.4498 12.0014C16.4498 12.4114 16.1098 12.7514 15.6998 12.7514Z"
              fill="#292D32"
            />
          </svg>
        </div>
        <h6 class="whitespace-nowrap text-center">Create Branch</h6>

        <Button
          onClick$={() => (modalSignal.value = true)}
          class="whitespace-nowrap"
        >
          Create
        </Button>
      </div>

      <dialog
        open={modalSignal.value}
        class="fixed left-0 top-0 h-screen w-screen bg-stone-950/80"
      >
        <div class="w-[35rem] rounded bg-stone-100">
          <p>
            <span
              class="cursor-pointer p-2 text-2xl font-black text-red-700"
              onClick$={() => (modalSignal.value = false)}
            >
              &#x2715;
            </span>
          </p>
          {props.action.value?.errors?.length && (
            <p class="text-red-700">{props.action.value.errors.join(";")}</p>
          )}
          <Form
            action={props.action}
            class="card m-12 flex flex-col items-stretch justify-center gap-5"
          >
            <Input
              type="text"
              name="name"
              placeholder="Branch name"
              error={props.action.value?.fieldErrors?.name}
            />
            <Input
              type="text"
              name="url_name"
              placeholder="Branch name in URL"
              error={props.action.value?.fieldErrors?.url_name}
            />
            <Select
              name="currency_id"
              error={props.action.value?.fieldErrors?.currency_id}
            >
              <option value="">Currency</option>
              {props.currencies?.value?.map((currency: any) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </Select>
            <Select
              name="default_language_id"
              error={props.action.value?.fieldErrors?.default_language_id}
            >
              <option value="">Language</option>
              {props.languages?.value?.map((language: any) => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </Select>
            <Button class="mx-auto w-1/2">Create</Button>
          </Form>
        </div>
      </dialog>
    </>
  );
});

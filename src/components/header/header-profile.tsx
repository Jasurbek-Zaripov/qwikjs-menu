import { component$, Signal } from "@builder.io/qwik";
import LinkHref from "~/components/link-href";
import { LangEnum } from "~/config/config";

interface Prop {
  lang: LangEnum;
  dic: Record<string, any>;
  user: Readonly<Signal<{ [p: string]: any }>>;
}

export default component$(({ lang, dic, user }: Prop) => {
  return (
    <>
      {user?.value?.id ? (
        <LinkHref href={`/${lang}/branches`}>
          <div class="flex gap-0.5">
            <div>
              <svg viewBox="0 0 32 32" xml:space="preserve">
                <path
                  d="M28.8,28.1c-0.6-3-2.9-5.4-5.9-6.2c-1.6-0.4-2.7-1.7-2.9-3.2c1.8-1.3,3-3.4,3-5.7c0-0.6,0.4-1,1-1c0.6,0,1-0.4,1-1V8.7
	c0-3.4-2.5-6.3-5.8-6.7c-2-0.2-4,0.5-5.4,2c-1-0.1-1.9,0.2-2.8,0.9C9.7,5.8,9,7.3,9,9v3.8c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1
	c0,0,0,0.1,0,0.1c0.1,2.2,1.2,4.3,2.9,5.6c-0.2,1.6-1.4,2.9-3,3.3c-3,0.8-5.2,3.1-5.8,6.1c-0.1,0.5,0,0.9,0.3,1.3
	C3.8,29.8,4.2,30,4.7,30h22.7c0.5,0,0.9-0.2,1.2-0.6C28.8,29.1,28.9,28.6,28.8,28.1z M5.2,28c0.6-2,2.2-3.5,4.2-4.1
	c2.7-0.7,4.5-3.1,4.5-5.8c0-0.4-0.2-0.7-0.5-0.9c-1.5-0.9-2.5-2.6-2.5-4.4c0-0.7,0.5-1.4,1.2-1.6l1.1-0.4c0.4-0.1,0.7-0.5,0.7-0.9
	V6.8c1.8,2.5,4.4,4.2,7.3,4.9C21.1,12.1,21,12.5,21,13c0,1.8-1,3.4-2.5,4.3c-0.3,0.2-0.5,0.5-0.5,0.9c0,2.7,1.8,5.1,4.5,5.7
	c2.1,0.5,3.7,2.1,4.3,4.1H5.2z"
                />
              </svg>
            </div>
            <div class="flex flex-col items-start justify-end text-sm">
              <p class="text-black">{user.value.name}</p>
              <span>
                <small>{user.value.email}</small>
              </span>
            </div>
          </div>
        </LinkHref>
      ) : (
        <div class="flex items-center gap-1">
          <LinkHref href={`/${lang}/sign-in`}>{dic?.signIn}</LinkHref>
          <LinkHref href={`/${lang}/sign-up`}>{dic?.signUp}</LinkHref>
        </div>
      )}
    </>
  );
});

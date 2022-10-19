import { component$, NoSerialize, noSerialize, useClientEffect$, useStore } from "@builder.io/qwik";
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

interface Store {
  editor: NoSerialize<Editor>
}

export default component$(() => {
  const store = useStore<Store>({ editor: undefined })

  useClientEffect$(() => {
    store.editor = noSerialize(new Editor({
      element: document.querySelector('.tiptap')!,
      content: '<p>hola</p>',
      extensions: [
        StarterKit,
      ],
    }))
  })

  return (
    <>
      <div class="tiptap" />
      <button onClick$={() => store.editor?.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
    </>
  )
})
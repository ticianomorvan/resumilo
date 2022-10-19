import { $, component$, NoSerialize, noSerialize, useClientEffect$, useStore } from "@builder.io/qwik";
import { Toolbar } from "~/components/toolbar";
import Pocketbase from 'pocketbase'

// Tiptap
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'


interface Store {
  title: string,
  description: string,
  author: string,
  editor: NoSerialize<Editor>
}

interface EndpointData {
  title: string,
  description: string,
  content: string,
  author: string,
}

export const uploadSummary = $(async (data: EndpointData) => {
  const client = new Pocketbase(import.meta.env.VITE_POCKETBASE)

  const request = await client.records.create('summaries', {
    title: data.title,
    description: data.description,
    content: data.content,
    author: data.author,
  })

  return request.id
})

export default component$(() => {
  const store = useStore<Store>({
    title: '', description: '', author: '',
    editor: undefined
  })

  useClientEffect$(() => {
    store.editor = noSerialize(new Editor({
      element: document.querySelector('.tiptap')!,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Escribe algo...',
        }),
        Highlight,
        Link
      ],
      editorProps: {
        attributes: {
          class: 'm-6 prose prose-sn sm:prose lg:prose-lg xl:prose-xl focus:outline-none'
        }
      }
    }))
  })

  return (
    <main class="flex flex-col items-center justify-center">
      <h1>Creemos tu resumen</h1>
      <Toolbar editor={store.editor} />
      <div class="tiptap my-8 w-3/4 border-2 border-black" />

      <h2>Unos últimos detalles...</h2>

      <form class="w-3/4 lg:w-1/2 my-4">
        <label>
          <p>Título</p>
          <input
            minLength={12}
            maxLength={80}
            required
            onChange$={(ev) => store.title = (ev.target as HTMLInputElement).value}
          />
        </label>

        <label>
          <p>Descripción</p>
          <input required onChange$={(ev) => store.description = (ev.target as HTMLInputElement).value} />
        </label>

        <label>
          <p>Tu nombre o apodo</p>
          <input required onChange$={(ev) => store.author = (ev.target as HTMLInputElement).value} />
        </label>

        <button
          type="button"
          id="create"
          class="w-full"
          onClick$={
            () => uploadSummary({
              title: store.title,
              description: store.description,
              author: store.author,
              content: store.editor!.getHTML()
            })
              .then((id) => alert(`Resumen creado con la ID: ${id}`))
              .catch((error) => alert(error))
          }
        >
          Crear
        </button>
      </form>
    </main>
  )
})
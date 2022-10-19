import { component$, NoSerialize } from "@builder.io/qwik";
import { Editor } from "@tiptap/core";

interface Props {
  editor: NoSerialize<Editor>
}

export const Toolbar = component$<Props>(({ editor }) => {
  if (!editor) return <p>Cargando herramientas...</p>

  return (
    <div class="toolbar">
      <button title="Escribe en negrita" onClick$={() => editor.chain().focus().toggleBold().run()}>
        <i class="fa-solid fa-bold" />
      </button>

      <button title="Escribe en tachado" onClick$={() => editor.chain().focus().toggleStrike().run()}>
        <i class="fa-solid fa-strikethrough" />
      </button>

      <button title="Escribe en itálica" onClick$={() => editor.chain().focus().toggleItalic().run()}>
        <i class="fa-solid fa-italic" />
      </button>

      <button title="Resalta sobre el cursor" onClick$={() => editor.chain().focus().toggleHighlight().run()}>
        <i class="fa-solid fa-highlighter" />
      </button>

      <button title="Inserta una frase" onClick$={() => editor.chain().focus().toggleBlockquote().run()}>
        <i class="fa-solid fa-quote-left" />
      </button>

      <button title="Inserta una lista" onClick$={() => editor.chain().focus().toggleBulletList().run()}>
        <i class="fa-solid fa-list" />
      </button>

      <button title="Crea un párrafo" onClick$={() => editor.chain().focus().setParagraph().run()}>
        <i class="fa-solid fa-paragraph" />
      </button>

      <button title="Deshace la última acción" onClick$={() => editor.chain().focus().undo().run()}>
        <i class="fa-solid fa-undo" />
      </button>

      <button title="Rehace la última acción" onClick$={() => editor.chain().focus().redo().run()}>
        <i class="fa-solid fa-redo" />
      </button>

      <button title="Crea un título (H1)" onClick$={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
        <p>H1</p>
      </button>

      <button title="Crea un título (H2)" onClick$={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        <p>H2</p>
      </button>

      <button title="Crea un título (H3)" onClick$={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        <p>H3</p>
      </button>
    </div>
  )
})
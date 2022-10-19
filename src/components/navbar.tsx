import { component$ } from "@builder.io/qwik";

export const Navbar = component$(() => {
  return (
    <header class="w-full top-0 flex sticky justify-between bg-white/80 backdrop-blur-md p-4">
      <nav>
        <p class="text-xl">Resumilo</p>
      </nav>
    </header>
  )
})
interface Create {
  name: string,
  content: string,
  date: Date
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const createResumen = async ({ name, content, date }: Create) => {
  const data = {
    name, content, date
  }

  fetch('/api/create', {
    method: 'POST', body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  })
}
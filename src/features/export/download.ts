export function downloadTextFile(
  filename: string,
  content: string,
  mimeType: string,
): void {
  const blob = new Blob(
    [content],
    { type: mimeType },
  )

  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = filename

  document.body.appendChild(anchor)

  try {
    anchor.click()
  } finally {
    anchor.remove()

    window.setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  }
}

/** Descarga una imagen (ej. 'img/logo2.png') y la devuelve en base64 con sus medidas, para usarla en un PDF. */
export async function cargarImagen(url: string): Promise<{ data: string; w: number; h: number }> {
  const blob = await (await fetch(url)).blob();
  const data = await new Promise<string>((ok, fallo) => {
    const r = new FileReader();
    r.onload = () => ok(r.result as string);
    r.onerror = () => fallo(r.error);
    r.readAsDataURL(blob);
  });
  const { w, h } = await new Promise<{ w: number; h: number }>((ok, fallo) => {
    const i = new Image();
    i.onload = () => ok({ w: i.naturalWidth, h: i.naturalHeight });
    i.onerror = () => fallo(new Error('Imagen inválida'));
    i.src = data;
  });
  return { data, w, h };
}

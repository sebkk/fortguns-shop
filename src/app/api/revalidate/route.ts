import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { timingSafeEqual } from 'crypto';

/**
 * Odpowiedzi z CMS-a leżą w Data Cache Vercela nawet dobę (CMS_DATA_REVALIDATE),
 * a ten cache przeżywa wdrożenie — przepchnięcie deployu go nie ruszy. Bez tej
 * trasy jedynym sposobem na zobaczenie zmiany z WordPressa było odczekanie
 * pełnego okna.
 */
const KNOWN_TAGS = ['pages', 'products', 'brands', 'global-infos'];

const SECRET = process.env.REVALIDATE_SECRET;

const isAuthorised = (given: string | null) => {
  if (!SECRET || !given) return false;

  const provided = Buffer.from(given);
  const expected = Buffer.from(SECRET);

  // Długości i tak nie da się ukryć, ale samej wartości już tak.
  return (
    provided.length === expected.length && timingSafeEqual(provided, expected)
  );
};

export async function POST(request: NextRequest) {
  // Brak sekretu to nie jest „przepuść wszystkich" — to wyłączony endpoint.
  if (!SECRET) {
    return NextResponse.json(
      { error: 'REVALIDATE_SECRET nie jest ustawiony, trasa jest wyłączona.' },
      { status: 503 },
    );
  }

  if (!isAuthorised(request.headers.get('x-revalidate-secret'))) {
    return NextResponse.json({ error: 'Nieautoryzowane.' }, { status: 401 });
  }

  const requestedTags = request.nextUrl.searchParams.getAll('tag');
  const unknownTags = requestedTags.filter((tag) => !KNOWN_TAGS.includes(tag));

  if (unknownTags.length) {
    return NextResponse.json(
      { error: `Nieznane tagi: ${unknownTags.join(', ')}`, known: KNOWN_TAGS },
      { status: 400 },
    );
  }

  const tags = requestedTags.length ? requestedTags : KNOWN_TAGS;
  const paths = request.nextUrl.searchParams.getAll('path');

  // Strony leżą pod trasami dynamicznymi (/[locale], /[locale]/produkt/[slug]),
  // a dla takich Next oczekuje wzorca trasy razem z typem — samo '/' nie trafia
  // w żadną z nich i kończy się cichym brakiem efektu.
  const typeParam = request.nextUrl.searchParams.get('type');

  if (typeParam && typeParam !== 'page' && typeParam !== 'layout') {
    return NextResponse.json(
      { error: "Parametr type przyjmuje 'page' albo 'layout'." },
      { status: 400 },
    );
  }

  tags.forEach((tag) => revalidateTag(tag));
  paths.forEach((path) =>
    typeParam ? revalidatePath(path, typeParam) : revalidatePath(path),
  );

  return NextResponse.json({
    revalidated: { tags, paths, type: typeParam ?? null },
    at: new Date().toISOString(),
  });
}

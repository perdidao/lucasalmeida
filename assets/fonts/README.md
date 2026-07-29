# Bundled fonts

## InstrumentSerif-Regular.ttf

Used **only** by `app/opengraph-image.tsx`, which reads it off disk at render
time. It is never served to browsers — the web fonts on the site itself are
self-hosted by `next/font/google` and come from `node_modules`.

It lives here rather than in `public/` precisely so it is not publicly routable.

Instrument Serif is licensed under the SIL Open Font License 1.1, which permits
bundling and redistribution: <https://openfontlicense.org>

Source: <https://fonts.google.com/specimen/Instrument+Serif>

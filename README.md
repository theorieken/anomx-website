# Anomx Website

## Static build

Run:

```sh
npm run build
```

The static site is written to `build/`. Deploy the contents of that directory as
your webroot, or point the web server root directly at the `build/` directory.

This build is fully static. Pages, CSS, JavaScript, images, video, `robots.txt`,
and `sitemap.xml` are included. Server-side routes such as
`/api/waitlist` require a Node.js runtime and will not run from a plain static
webroot.

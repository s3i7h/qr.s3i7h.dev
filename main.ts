import { qrcode } from "https://deno.land/x/qrcode/mod.ts";

Deno.serve(async (req: Request) => {
    const request_url = new URL(req.url);

    let url, path, params, url_param;
    if ((path = request_url.pathname) && path.substr(1)) {
        url = req.url.replace(request_url.origin, "").substr(1);
    } else if ((params = request_url.searchParams) && (url_param = params.get("url"))) {
        url = decodeURIComponent(url_param)
    } else {
        url = ""
    }

    if (url) {
        const page = `<!doctype html>
<html>
<head><title>${url}</title></head>
<body>
<img src="${await qrcode(url)}"/>
</body>
</html>
`
    
        return new Response(page, {
            status: 200,
            headers: {
                "content-type": "text/html",
            },
        });
    } else {
        return new Response(null, {
            status: 301,
            headers: {
                "location": "https://github.com/qr.s3i7h.dev",
            });
    }
});

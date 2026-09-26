export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const noStore = { 'Cache-Control': 'no-store' };

    if (pathname !== '/resume' && pathname !== '/resume/') {
      return new Response('Not found', { status: 404, headers: noStore });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', {
        status: 405,
        headers: { ...noStore, Allow: 'GET, HEAD' },
      });
    }

    const resume = request.method === 'HEAD'
      ? await env.RESUME_BUCKET.head('resume.pdf')
      : await env.RESUME_BUCKET.get('resume.pdf');
    if (!resume) return new Response('Resume not found', { status: 404, headers: noStore });

    return new Response(request.method === 'HEAD' ? null : resume.body, {
      headers: {
        ...noStore,
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
        'Content-Length': String(resume.size),
        'X-Content-Type-Options': 'nosniff',
      },
    });
  },
};

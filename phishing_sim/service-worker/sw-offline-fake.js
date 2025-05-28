self.addEventListener('fetch', (event) => {
    event.respondWith(
        new Response('<h1>This is a fake offline page</h1>', {
            headers: { 'Content-Type': 'text/html' },
        })
    );
});

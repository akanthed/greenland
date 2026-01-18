import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://greenland-untold.vercel.app';

    // Define all your main routes
    const routes = [
        '',
        '/about',
        '/story',
        '/data',
        '/games',
        '/polls',
        '/privacy',
        '/terms',
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/polls' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));
}

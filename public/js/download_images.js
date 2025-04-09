const https = require('https');
const fs = require('fs');
const path = require('path');

const images = {
    banner1: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop',
    banner2: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=2070&auto=format&fit=crop',
    banner3: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    event1: 'https://images.unsplash.com/photo-1507838153414-b4b8c0251e8b?q=80&w=2070&auto=format&fit=crop',
    event2: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2070&auto=format&fit=crop',
    event3: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop',
    event4: 'https://images.unsplash.com/photo-1546519638-68e109dbb01d?q=80&w=2070&auto=format&fit=crop',
    event5: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop',
    event6: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2070&auto=format&fit=crop'
};

function downloadImage(url, filename) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download image: ${response.statusCode}`));
                return;
            }

            const filePath = path.join(__dirname, '..', 'images', filename);
            const fileStream = fs.createWriteStream(filePath);

            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded ${filename}`);
                resolve();
            });

            fileStream.on('error', (err) => {
                fs.unlink(filePath, () => {});
                reject(err);
            });
        }).on('error', reject);
    });
}

async function downloadAllImages() {
    try {
        // Create images directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', 'images'))) {
            fs.mkdirSync(path.join(__dirname, '..', 'images'));
        }

        // Download all images
        const promises = Object.entries(images).map(([name, url]) => {
            const filename = `${name}.jpg`;
            return downloadImage(url, filename);
        });

        await Promise.all(promises);
        console.log('All images downloaded successfully!');
    } catch (error) {
        console.error('Error downloading images:', error);
    }
}

downloadAllImages(); 
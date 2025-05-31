const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Ensure the images directory exists
if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory not found!');
    process.exit(1);
}

// Get all image files
const imageFiles = fs.readdirSync(IMAGES_DIR).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
});

// Process each image
async function optimizeImages() {
    for (const file of imageFiles) {
        const inputPath = path.join(IMAGES_DIR, file);
        const outputPath = path.join(IMAGES_DIR, `optimized-${file}`);

        try {
            const image = sharp(inputPath);
            const metadata = await image.metadata();

            // Calculate new dimensions while maintaining aspect ratio
            let width = metadata.width;
            let height = metadata.height;

            if (width > 1920) {
                height = Math.round((height * 1920) / width);
                width = 1920;
            }

            // Optimize the image
            await image
                .resize(width, height, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({
                    quality: 85,
                    progressive: true
                })
                .toFile(outputPath);

            console.log(`Optimized ${file}`);

            // Replace original with optimized version
            fs.unlinkSync(inputPath);
            fs.renameSync(outputPath, inputPath);
        } catch (error) {
            console.error(`Error optimizing ${file}:`, error);
        }
    }
}

optimizeImages().catch(console.error); 
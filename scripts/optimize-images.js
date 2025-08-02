import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { globSync } from 'glob';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'optimized');
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];
const WEBP_QUALITY = 80;
const MAX_WIDTH = 1920;

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(filePath) {
  try {
    const relativePath = path.relative(PUBLIC_DIR, filePath);
    const outputPath = path.join(OUTPUT_DIR, relativePath.replace(/\.[^/.]+$/, '.webp'));
    
    // Create directory structure if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    
    // Calculate new width (maintain aspect ratio but cap at MAX_WIDTH)
    const newWidth = metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;
    
    // Process image
    await sharp(filePath)
      .resize(newWidth)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✅ Optimized: ${relativePath}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB, Optimized: ${(optimizedSize / 1024).toFixed(2)} KB, Saved: ${savings}%`);
    
    return {
      originalPath: filePath,
      optimizedPath: outputPath,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
    return null;
  }
}

async function optimizeImages() {
  console.log('🔍 Searching for images...');
  
  // Find all images in the public directory
  const imagePatterns = IMAGE_EXTENSIONS.map(ext => `**/*.${ext}`);
  const imagePaths = imagePatterns.flatMap(pattern => 
    globSync(pattern, { cwd: PUBLIC_DIR, absolute: true })
  );
  
  console.log(`🖼️ Found ${imagePaths.length} images to optimize`);
  
  // Process images
  const results = [];
  for (const imagePath of imagePaths) {
    const result = await optimizeImage(imagePath);
    if (result) results.push(result);
  }
  
  // Calculate total savings
  const totalOriginalSize = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimizedSize = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2);
  
  console.log('\n📊 Optimization Summary:');
  console.log(`   Total Images: ${results.length}`);
  console.log(`   Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Total Savings: ${totalSavings}%`);
  console.log('\n✨ Optimized images are available in the /public/optimized directory');
  console.log('⚠️ Note: This script does not replace original images. You need to manually update your image paths.');
}

// Run the optimization
optimizeImages().catch(err => {
  console.error('Error during image optimization:', err);
  process.exit(1);
}); 
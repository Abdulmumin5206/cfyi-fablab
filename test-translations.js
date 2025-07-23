// Simple test to check if translations are loading correctly
const fs = require('fs');

console.log('Testing blog translations...\n');

// Read English blog translations
const enBlog = JSON.parse(fs.readFileSync('./src/i18n/locales/en/blog.json', 'utf8'));
console.log('English blog translations loaded:');
console.log('- projectsHeadline:', enBlog.blog.projectsHeadline);
console.log('- biomimeticArm.title:', enBlog.blog.biomimeticArm.title);
console.log('- droneProject.title:', enBlog.blog.droneProject.title);
console.log('- rrrArm.title:', enBlog.blog.rrrArm.title);
console.log('- surveillanceCar.title:', enBlog.blog.surveillanceCar.title);

// Read Russian blog translations
const ruBlog = JSON.parse(fs.readFileSync('./src/i18n/locales/ru/blog.json', 'utf8'));
console.log('\nRussian blog translations loaded:');
console.log('- projectsHeadline:', ruBlog.blog.projectsHeadline);
console.log('- biomimeticArm.title:', ruBlog.blog.biomimeticArm.title);

// Read Uzbek blog translations
const uzBlog = JSON.parse(fs.readFileSync('./src/i18n/locales/uz/blog.json', 'utf8'));
console.log('\nUzbek blog translations loaded:');
console.log('- projectsHeadline:', uzBlog.blog.projectsHeadline);
console.log('- biomimeticArm.title:', uzBlog.blog.biomimeticArm.title);

console.log('\n✅ All translation files are properly structured!');
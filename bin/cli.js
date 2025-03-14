#!/usr/bin/env node
import { program } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import nunjucks from 'nunjucks';

// Configure ES module directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Nunjucks
const env = nunjucks.configure({
  autoescape: false,
  trimBlocks: true,
  lstripBlocks: true
});

// CLI Program Setup
program
  .version('1.0.0')
  .description('School Website Generator CLI')
  .argument('[dir]', 'Output directory')
  .action(async (dir = 'school-website') => {
    try {
      const projectPath = path.resolve(process.cwd(), dir);
      
      // Validate directory
      if (await fs.pathExists(projectPath)) {
        throw new Error(`Directory "${dir}" already exists!`);
      }

      // Collect user input
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'schoolName',
          message: 'School name:',
          validate: input => !!input.trim() || 'Name is required'
        },
        {
          type: 'input',
          name: 'primaryColor',
          message: 'Primary color (hex code):',
          default: '#1a4d8f',
          validate: input => /^#([0-9A-F]{3}){1,2}$/i.test(input) || 'Invalid hex color'
        },
        {
          type: 'input',
          name: 'contactEmail',
          message: 'Contact email:',
          default: 'info@school.edu'
        }
      ]);

      // Create project structure
      await fs.ensureDir(projectPath);
      
      // Generate core files
      await generateFileStructure(projectPath, answers);
      
      // Final message
      console.log(chalk.green.bold('\n✅ Website generated successfully!'));
      console.log(`
Next steps:
  cd ${dir}
  npm install
  npm run dev
      `);

    } catch (error) {
      console.error(chalk.red.bold('\n💥 Error:'), error.message);
      process.exit(1);
    }
  });

// File Generation Functions
async function generateFileStructure(projectPath, config) {
  const templatePath = path.join(__dirname, '../templates/nextjs');
  
  // Generate pages
  const pages = [
    'src/pages/index.js',
    'src/pages/_app.js',
    'src/pages/_document.js',
    // 'src/pages/academics.js',
    // 'src/pages/admissions.js',
    // 'src/pages/contact.js'
  ];

  await Promise.all(pages.map(async (pagePath) => {
    const content = env.render(path.join(templatePath, pagePath), config);
    await fs.outputFile(path.join(projectPath, pagePath), content);
  }));

  // Generate components
  const components = [
    'src/components/Header.js',
    'src/components/Footer.js',
    //'src/components/ContactForm.js'
  ];

  await Promise.all(components.map(async (componentPath) => {
    const content = env.render(path.join(templatePath, componentPath), config);
    await fs.outputFile(path.join(projectPath, componentPath), content);
  }));

  // Generate API routes
//   const apiRoutes = [
//     'src/pages/api/news.js',
//     'src/pages/api/events.js'
//   ];

//   await Promise.all(apiRoutes.map(async (routePath) => {
//     const content = env.render(path.join(templatePath, routePath), config);
//     await fs.outputFile(path.join(projectPath, routePath), content);
//   }));

  //Generate configuration files
  const configFiles = [
    'next.config.js',
    'tailwind.config.js',
    'postcss.config.js',
    'src/styles/globals.css'
  ];

  await Promise.all(configFiles.map(async (configPath) => {
    const content = env.render(path.join(templatePath, configPath), config);
    await fs.outputFile(path.join(projectPath, configPath), content);
  }));

  //Copy public assets
//   await fs.copy(
//     path.join(templatePath, 'public'),
//     path.join(projectPath, 'public')
//   );

  // Generate package.json
  const packageJson = {
    name: config.schoolName.toLowerCase().replace(/\s+/g, '-'),
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      next: "^14.1.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@supabase/supabase-js": "^2.39.8",
      "swr": "^2.2.0",
      "tailwindcss": "^3.3.3",
      "autoprefixer": "^10.4.16",
      "postcss": "^8.4.31"
    }
  };

  await fs.writeJson(
    path.join(projectPath, 'package.json'),
    packageJson,
    { spaces: 2 }
  );

  // Create env example
//   await fs.writeFile(
//     path.join(projectPath, '.env.local.example'),
//     `NEXT_PUBLIC_SUPABASE_URL=
// NEXT_PUBLIC_SUPABASE_KEY=`
//   );
}

program.parseAsync(process.argv);
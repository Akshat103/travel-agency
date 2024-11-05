// uncss.js
const uncss = require('uncss');
const fs = require('fs');
const path = require('path');

const options = {
    // Specify the files that should be scanned for used CSS
    html: [path.join(__dirname, 'dist/index.html')], // Adjust this path as necessary
    // Specify the CSS files to be processed
    css: [path.join(__dirname, 'dist/styles.css')], // Add your CSS files here if needed
    // You can specify additional options here
    timeout: 10000, // Increase timeout if necessary
};

// Adding a custom resource loader to handle missing scripts
const customResourceLoader = {
    fetch: (url) => {
        const filePath = path.join(__dirname, url.replace(/^file:\/\//, '').replace(/\?.*$/, '')); // Adjust file path
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.warn(`Warning: Could not load script: ${url}`);
                    resolve('');
                } else {
                    resolve(data.toString());
                }
            });
        });
    },
};

uncss(options.html, {
    ...options,
    resourceLoader: customResourceLoader,
}, (error, output) => {
    if (error) {
        console.error(error);
        return;
    }
    // Save the output to your CSS file
    fs.writeFileSync(path.join(__dirname, 'dist/styles.css'), output);
    console.log('Unused CSS removed!');
});

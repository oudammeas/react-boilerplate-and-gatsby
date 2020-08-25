const shell = require('shelljs');
const addCheckMark = require('./helpers/checkmark.js');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if (!shell.test('-e', 'internals/templates')) {
  shell.echo('The example is deleted already.');
  shell.exit(1);
}

process.stdout.write('Cleanup started...');

// Reuse existing LanguageProvider and i18n tests
shell.mv(
  'src/app/containers/LanguageProvider/tests',
  'internals/templates/containers/LanguageProvider',
);
shell.cp('src/app/tests/i18n.test.js', 'internals/templates/tests/i18n.test.js');

// Cleanup components/
shell.rm('-rf', 'src/app/components/*');

// Handle containers/
shell.rm('-rf', 'src/app/containers');
shell.mv('internals/templates/containers', 'src/app');

// Handle tests/
shell.mv('internals/templates/tests', 'src/app');

// Handle translations/
shell.rm('-rf', 'src/app/translations');
shell.mv('internals/templates/translations', 'src/app');

// Handle utils/
shell.rm('-rf', 'src/app/utils');
shell.mv('internals/templates/utils', 'src/app');

// Replace the files in the root app/ folder
shell.cp('internals/templates/app.js', 'src/app/app.js');
shell.cp('internals/templates/global-styles.js', 'src/app/global-styles.js');
shell.cp('internals/templates/i18n.js', 'src/app/i18n.js');
shell.cp('internals/templates/index.html', 'src/app/index.html');
shell.cp('internals/templates/reducers.js', 'src/app/reducers.js');
shell.cp('internals/templates/configureStore.js', 'src/app/configureStore.js');

// Remove the templates folder
shell.rm('-rf', 'internals/templates');

addCheckMark();

// Commit the changes
if (
  shell.exec('git add . --all && git commit -qm "Remove default example"')
    .code !== 0
) {
  shell.echo('\nError: Git commit failed');
  shell.exit(1);
}

shell.echo('\nCleanup done. Happy Coding!!!');

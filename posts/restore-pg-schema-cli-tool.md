---
title: 'Build a simple CLI tool to simplify your day-to-day tasks'
date: '2020-04-30'
---

It’s a common task in my current position to download and restore client schema on my local postgres to debug it. So I decided to build a small CLI tool to help me.

--- 

Fully inspired (to not say copy/pasted) from this post by [Lukas White](https://www.sitepoint.com/author/lwhite) and [James Hibbard](https://www.sitepoint.com/author/jhibbard):
**[Build a JavaScript Command Line Interface (CLI) with Node.js](https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/)**

**How it works**

I type `pg-schema-restorer` in my terminal and the following appears:

![pg-schema-restorer](/images/restore-pg-schema-cli-tool/pg-schema-restorer.png)


The tool look for the .backup files in my folders and subfolders of `~/Documents` and `~/Downloads` and ask me to select one.

Once chosen it asks me the name of the schema (try to deduce it from the filename)

After that I need to enter the database credentials. Only for the first time because it’s saved into a local storage thank’s to `configstore`

![pg-schema-restorer](/images/restore-pg-schema-cli-tool/credentials.png)

And from here the given schema name will be dropped and the backup restored.
I added some flavours in the script I use at my job to automatically reference the new schema into the public table with some more queries but you get the idea.

**The code**

I won’t go into too much details because the post I referenced earlier is very detailled.
The following is just to clear the console and display the ASCII art because I can. It’s using `chalk` to colorize the output, `figlet` for the art and clear

```js
clear()
console.log(
    chalk.yellow(
        figlet.textSync('PG Schema Restorer', { horizontalLayout: 'full' }),
    ),
)
```

To look for the backup in a directory and all it’s subdirectories I’m using a library called `klawSync` you can apply a filter to it so it will already find exactly what you’re looking for

```js
const findBackupsInPath = filePath => {
	return klawSync(filePath, {
		nodir: true,
		traverseAll: true,
		filter: filePath => {
			const basename = path.basename(filePath.path)
			return basename.match(/.\.backup$/);
		}
	}).map(f => f.path)
}
```

You can then use this list of backups to `inquirer` that will display a beautiful prompt with it

```js
askBackupFile: filelist => {
    const questions = [
        {
            type: 'list',
            name: 'backupPath',
            message: 'Select the backup you want to restore:',
            choices: filelist,
        }
    ];
    return inquirer.prompt(questions);
}
```

I want the database credentials to be stored so that users don’t have to type it anytime but in the same time they should be able to reset it if they need to restore on another database.

```js
// retrieve databaseCredentials
const conf = new Configstore('schemaRestorer')
if (!conf.get('databaseCredentials')) {
    conf.set('databaseCredentials', await inquirer.askDatabaseCredentials())
} else {
    const db = conf.get('databaseCredentials')
    console.log(`Using these postgres credentials: ${db.host}:${db.port}/${db.database}?user=${db.user}&password=${db.password}`)
    const { confirmDbCredentials } = await inquirer.askConfirmDatabaseCredentials()
    if (confirmDbCredentials === false) {
        conf.set('databaseCredentials', await inquirer.askDatabaseCredentials())
    }
}
const databaseCredentials = conf.get('databaseCredentials')
```

For that I’m using `configstore` which simply store my configs into a json file in the npm user directory. I ask the user if he wants to continue with the saved credentials if any.

To drop the existing schema I’m using `pg` ORM which is really easy to manipulate.

```js
const client = new Client(databaseCredentials)
await client.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
await client.end()
```

And finally to restore the schema I’m using the system `pg_restore` thank’s to the `exec` command in the npm package `child_process`
To simplify my code I’ve encapsulated it into a Promise so that I can await it’s result before continuing the program.

```js
await new Promise((resolve, reject) => {
    exec(`pg_restore -d ${databaseCredentials.database} -U ${databaseCredentials.user} -C -w ${backupPath}`, async (error) => {
        if (error !== null) {
            console.error(`Error restoring the backup: ${error}`);
            reject();
            process.exit(1)
        }
        console.info(`Backup '${backupPath}' has been restored...`);
        resolve();
    })
});
```

---

If you’re interested in reading the code I’ve made it available on [github](https://github.com/m4nu56/pg-schema-restorer)

Feel free to comment it, correct it, test it etc.. I’ve only been using it myself on my Ubuntu setup so for sure it needs to be somehow adapted for MacOS and Windows.

You can also follow me on Twitter if you’d like, I share mostly geeky coding stuff: https://twitter.com/m4nu56


## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```

const fs = require('fs');

async function cleanFile() {
    const data = await fs.readFile('a.txt', 'utf-8');
    const cleaned_data = data.replace("/\s+/g", "").trim()

    await fs.writeFile("path", cleaned_data, 'utf-8')
}
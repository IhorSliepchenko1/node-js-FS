const fs = require(`fs`);
const path = require(`path`);

// fs.mkdir(path.resolve(__dirname, `dir`), (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`папка создана`);
// });

// fs.rmdir(path.resolve(__dirname, `dir`), (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log(`папка удалена`);
// });

const file = path.resolve(__dirname, `test.csv`);

const createFile = () => {
  const header = `number;date;time`;
  return fs.writeFile(file, header, (err) => {
    if (err) {
      throw err;
    }
    console.log(`файл создан`);
  });
};

const fileData = () => {
  if (!fs.existsSync(file)) {
    createFile();
  }

  const delay = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const dateTime = () => {
    const time = new Date(Date.now()).toLocaleTimeString();
    const date = new Date(Date.now()).getDate();

    return { time, date };
  };

  let value = ``;

  const appendFile = async () => {
    for (let i = 0; i <= 10; i++) {
      await delay();
      value = `\n${i + 1};${dateTime().date};${dateTime().time}`;

      fs.appendFile(file, value, (err) => {
        if (err) {
          throw err;
        }
        console.log(`данные записаны`);
      });
    }
  };

  appendFile();
};

// fileData();

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err.message);
      }

      resolve();
    })
  );
};
const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) {
        reject(err.message);
      }

      resolve();
    })
  );
};
const readFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        reject(err.message);
      }

      resolve(data);
    })
  );
};
const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.rm(path, (err) => {
      if (err) {
        reject(err.message);
      }

      resolve();
    })
  );
};

const dirPath = path.resolve(__dirname, `test.txt`);
// writeFileAsync(dirPath, `header`)
//   .then(() => appendFileAsync(dirPath, `\n100`))
//   .then(() => appendFileAsync(dirPath, `\n200`))
//   .then(() => appendFileAsync(dirPath, `\n300`))
//   .then(() => readFileAsync(dirPath))
//   .then((data) => console.log(data))

//   .catch((error) => console.error(error));
// removeFileAsync(dirPath);

const string = `test string`;

const writeFile = async (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path.resolve(__dirname, file), data, (err) => {
      if (err) {
        rej(err);
      }

      res();
    });
  });
};

const readFileWord = async (file) => {
  return new Promise((res, rej) => {
    fs.readFile(
      path.resolve(__dirname, file),
      { encoding: `utf-8` },
      (err, data) => {
        if (err) {
          rej(err);
        }

        res(data);
      }
    );
  });
};

const rmFile = async (file) => {
  return new Promise((res, rej) => {
    fs.rm(path.resolve(__dirname, file), (err) => {
      if (err) {
        reject(err.message);
      }

      res();
    });
  });
};

const result = () => {
  writeFile(`word.txt`, string).then(() => console.log(`word.txt was created`));
  readFileWord(`word.txt`).then((data) => {
    const countWord = data.split(` `).length;
    console.log(countWord);

    writeFile(`count.txt`, countWord.toString()).then(() =>
      console.log(`count.txt was created`)
    );
  });

  rmFile(`word.txt`).then(() => console.log(`word.txt deleted`));
};

result();

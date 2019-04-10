const fs = require("fs");
const path = require("path");

// Make list of files in a directory
function readFilesSync(dir) {
  const files = [];

  fs.readdirSync(dir).forEach(filename => {
    const Ref = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const originpath = path.resolve(dir);
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();

    if (isFile) files.push({ filepath, Ref, ext, originpath });
  });
  return files;
}

const imagesPath = "./images";
const fileList = readFilesSync(imagesPath, "utf8");
// console.log(fileList);

// Read JSON and compare to fileList
const csvToJson = "list.json";
const listJSON = JSON.parse(fs.readFileSync(csvToJson, "utf8"));

// Append key to matching array, object values, with array mutations -> map
// This will return new variable with result

const shorterRef = ref => ref.substr(0, 9);

const newFileList = fileList.map(obj => {
  const fileListRef = shorterRef(obj.Ref);
  const listJSONObj = listJSON.find(tmp => shorterRef(tmp.Ref) === fileListRef);
  if (listJSONObj) return { ...obj, Style: listJSONObj.Style };
});

//console.log(newFileList);

// Create folder accordingly with HD and SD subfolders
//possible improvement if file bigger than x move to HD else SD

const subFolderName = "HD";

Object.keys(newFileList).forEach(key => {
  const folderName = newFileList[key].Style.toUpperCase();
  const destFolder = path.join(imagesPath, folderName);
  console.log(folderName);
  fs.mkdir(destFolder, err => {
    if (err) {
      console.log("Folder already exist");
    } else {
      console.log(`${folderName} created !!`);
    }
  });

  // CREATE SUBFOLDER
  const subFolderPath = path.join(destFolder, subFolderName);

  fs.mkdir(subFolderPath, err => {
    if (err) {
      console.log("Folder already exist");
    } else {
      console.log(`${subFolderPath} created !!`);
    }
  });
});

// Move files in their corresponding folder in HD subfolder
Object.keys(newFileList).forEach(key => {
  const folderName = newFileList[key].Style;
  //Build file name
  const fileNameExt = newFileList[key].Ref.concat(newFileList[key].ext);
  // Built origin path
  const originPath = path.join(
    newFileList[key].originpath.concat("\\", fileNameExt)
  );
  //Build dest path
  const imageDestPath = path.join(
    newFileList[key].originpath, folderName, subFolderName, fileNameExt);

  fs.renameSync(originPath, imageDestPath, err => {
    if (err) throw err;
  });
});

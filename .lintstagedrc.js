module.exports = {
  "**/*.(ts?(x)|?(m)js)": (filenames) => [
    // `next lint --fix --file ${filenames
    //   .map((file) => file.split(process.cwd())[1])
    //   .join(" --file ")}`,
    `prettier --write ${filenames.join(" ")}`,
  ],
};

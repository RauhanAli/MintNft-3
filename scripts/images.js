const PinataJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkYzViMzNmMS00ZDRjLTQwODktYTY4OS1jOWY0ZDg3NjI2ZDUiLCJlbWFpbCI6InJhdWhhbmFsaTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImE0ZWE2NDI1NzM1YzNkYmU0ZTQ0Iiwic2NvcGVkS2V5U2VjcmV0IjoiY2U5NDNkYjAwNDMzMzRmY2VlNjliNGZjZTllM2E2ZjVhOGU1NjUyZDMzYjY1Yjk3ZGZhNjVmMTcwNWMwZjA3YSIsImlhdCI6MTY2MTE2Mzk1OX0.WT9YrUZOxgnkTAF1cHde9yYZm20r4awf4BRb1JpbIoI";
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const recursive = require("recursive-fs");
const basePathConverter = require("base-path-converter");

async function main() {
  try {
    const path = "./build/images";
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    recursive.readdirr(path, function (err, dirs, files) {
      let data = new FormData();
      files.forEach((file) => {
        data.append(`file`, fs.createReadStream(file), {
          filepath: basePathConverter(path, file),
        });
      });

      const metadata = JSON.stringify({
        name: "Images",
      });
      data.append("pinataMetadata", metadata);

      return axios
        .post(url, data, {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
            Authorization: `Bearer ${PinataJWT}`,
          },
        })
        .then(function (response) {
          console.log(response.data);
          process.exit(0);
        })
        .catch(function (error) {
          throw error;
        });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main(); 
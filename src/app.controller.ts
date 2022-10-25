import { Controller, Get, Param } from '@nestjs/common';
import { resolve } from 'path';
import { AppService } from './app.service';
const { Poppler } = require("node-poppler");
const fs = require('fs');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'This Is The New Test';
  }

  @Get('promise/:url')
  promisePdf(@Param('url') url: string): Promise<any> {
    url = 'https://lightquote.net/app/trans-quote/uploads/' + url;
    
    const https = require("https");
    const unixts = String(Date.now());
    const fileName = "uploads" + "\\" + String(unixts) + ".pdf";

    let idx = fileName.indexOf(".");
    const destFIneName = fileName.substring(0,idx) + ".txt";
    const file = fs.createWriteStream(fileName);

    const myPromise = new Promise((resolve, reject) => {
      https.get(url, response => {
        var stream = response.pipe(file);
        stream.on("finish", function() {
          pdfToText(fileName, destFIneName);
          resolve(unixts + ".txt");
        });
      });

    });
          
    return myPromise.then((data)=>{
      // success
      return data;
    }, () =>{
      //fail
      console.log('pdf-to-text promise failed')
    })

  }

  @Get('responsetext/:fileName')
  getTextFromFile(@Param('fileName') fileName: string): string {
    let stream = fs.readFileSync('.\\' + 'uploads' + '\\' + fileName, "UTF-8");
    return stream;
  }
  
}

function pdfToText(file: string, destFileName: string){
  const poppler = new Poppler();
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 1,
  };
  
  poppler.pdfToText(file, destFileName, options).then((res) => {
    fs.readFile(destFileName, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  });
}
import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('responsetext/:fileName')
  getTextFromFile(@Param('fileName') fileName: string): string {
    let lorem = fs.readFileSync('.\\' + 'uploads' + '\\' + fileName, "UTF-8");
    return lorem;
  }

  @Get('pdf/:url')
  downloadPdf(@Param('url') url: string): any {
    url = 'https://lightquote.net/app/trans-quote/uploads/' + url;
    
    const https = require("https");
    const unix = String(Date.now());
    const fileName = "uploads" + "\\" + String(unix) + ".pdf";

    let idx = fileName.indexOf(".");
    const destFIneName = fileName.substring(0,idx) + ".txt";
    const file = fs.createWriteStream(fileName);

    https.get(url, response => {
      var stream = response.pipe(file);
      stream.on("finish", function() {
        pdfToText(fileName, destFIneName);
      });
    });

    return unix + ".txt";

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
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

  @Get('convert/:fileName')
  convert(@Param('fileName') fileName: string): any {
    let url = 'path-to-uploads/' + fileName;
    let fname = 'tmp/shiran.pdf';
    let idx = fname.indexOf(".");
    const destFileName = fname.substring(0, idx) + ".txt";
    pdfToText(fname, destFileName);
    return 'Done';
  }

  @Get('text/:fileName')
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
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
    const serverPdfLocation = `/home/lightquote/www/app/trans-quote/uploads/${fileName}.pdf`;
    const pdf = `tmp/${fileName}.pdf`;
    const targetTextFile = `uploads/${fileName}.txt`;
    let res = 0;
    if (fs.existsSync(pdf)) {
      res = 1;
      pdfToText(pdf, targetTextFile);
    } else {
      res = 0;
    }
        
    return res;
  }

  @Get('text/:fileName')
  getTextFromFile(@Param('fileName') fileName: string): string {
    const path = '.\\' + 'uploads' + '\\' + fileName + ".txt";
    if (fs.existsSync(path)) {
      let stream = fs.readFileSync(path, "UTF-8");
      return stream;
    } else {
      return 'file-not-exists';
    }
  }
  
}

function pdfToText(file: string, targetTextFile: string){
  const poppler = new Poppler();
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 1,
  };
  
  poppler.pdfToText(file, targetTextFile, options).then((res) => {
    fs.readFile(targetTextFile, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
    });
  });
}
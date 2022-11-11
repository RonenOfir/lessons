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

  @Get('test2')
  getTest(): string {
    return 'This Is The New Test2';
  }

  @Get('convert/:fileName')
  async convert(@Param('fileName') fileName: string): Promise<number> {
    const serverPdfLocation = `/home/lightquote/www/app/trans-quote/uploads/${fileName}.pdf`;
    const targetTextFile = `/home/lightquote/www/app/trans-quote/convertions/${fileName}.txt`;
    // const serverPdfLocation = `tmp/${fileName}.pdf`;
    // const targetTextFile = `convertions/${fileName}.txt`;
    
    let res = 0;
    if (fs.existsSync(serverPdfLocation)) {
      res = 1;
      await convertToText(serverPdfLocation, targetTextFile);
    } else {
      res = 0;
    }
        
    return res;
  }

  @Get('text/:fileName')
  getTextFromFile(@Param('fileName') fileName: string): string {
    // const path = `convertions/${fileName}.txt`;
    const path = `/home/lightquote/www/app/trans-quote/convertions/${fileName}.txt`;
    if (fs.existsSync(path)) {
      let stream = fs.readFileSync(path, "UTF-8");
      return stream;
    } else {
      return 'file-not-exists';
    }
  }
  
}

async function convertToText(file: string, targetTextFile: string){
  const poppler = new Poppler();
  const options = {
    firstPageToConvert: 1,
    lastPageToConvert: 1,
  };
  
  const res = await poppler.pdfToText(file, targetTextFile, options);
  console.log('pdftoText Done');
}
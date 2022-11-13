import { Controller, Get, Param } from '@nestjs/common';
import { resolve } from 'path';
import { AppService } from './app.service';
const { Poppler } = require("node-poppler");
const fs = require('fs');
const https = require('https');
const pdfUtil = require('pdf-to-text');
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('convert/:fileName')
  pdfToTxt(@Param('fileName') fileName: string): number {
     // const pdf_path = `/home/lightquote/www/app/trans-quote/uploads/${fileName}.pdf`;
    // const text_path = `/home/lightquote/www/app/trans-quote/conversions/${fileName}.txt`;
    const pdf_path = `tmp/${fileName}.pdf`;
    const text_path = `conversions/${fileName}.txt`;

    if (!fs.existsSync(pdf_path)) {
      return 0;
    }
    
    pdfUtil.pdfToText(pdf_path, function(err, data) {
      if (err) throw(err);
      fs.writeFile(text_path, data, function (err) {
            if (err) return 0;
            console.log('ok');
    });

    });
    
    return 1;
  }

  @Get('cher')
  cher(): string {
    const u = 'https://en.wikipedia.org/wiki/Cher';

    const req = https.get(u, (res) => {
      let download = fs.createWriteStream("/home/lightquote/www/app/trans-quote/conversions/cher.txt");
      res.pipe(download);

      res.on("end", () => {
        console.log('finished');
      })

    });

    req.end();
    return 'cher';
  }

  @Get('test')
  getTest(): string {
    return 'This Is The New Test...';
  }

  @Get('convert-old/:fileName')
  async convert(@Param('fileName') fileName: string): Promise<any> {
    // const serverPdfLocation = `/home/lightquote/www/app/trans-quote/uploads/${fileName}.pdf`;
    // const targetTextFile = `/home/lightquote/www/app/trans-quote/conversions/${fileName}.txt`;
    const serverPdfLocation = `tmp/${fileName}.pdf`;
    const targetTextFile = `conversions/${fileName}.txt`;
    
    let res = 0;
    if (fs.existsSync(serverPdfLocation)) {
      res = 1;
      const ret = await convertToText(serverPdfLocation, targetTextFile);
      return res;
    } else {
      res = 0;
    }
        
    return res;
  }

  @Get('text/:fileName')
  getTextFromFile(@Param('fileName') fileName: string): string {
    const path = `conversions/${fileName}.txt`;
    // const path = `/home/lightquote/www/app/trans-quote/conversions/${fileName}.txt`;
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
  
  const res = await poppler.pdfToText(file, options);
  console.log('pdftoText Done');
}
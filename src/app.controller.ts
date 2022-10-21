import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('pdf')
  readPdf(): any {
    
    const fs = require("fs");
    const https = require("https");
    const fileName = String(Date.now()) + ".pdf";
    const file = fs.createWriteStream(fileName);

    https.get("https://lightquote.net/app/trans-quote/uploads/1666243161.pdf", response => {
      var stream = response.pipe(file);

      stream.on("finish", function() {
        console.log("done");
      });
    });


  }
}

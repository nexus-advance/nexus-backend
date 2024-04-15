import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as jsRender from 'jsrender';
import * as JsReport from 'jsreport-core';
import * as JsReportChromePdf from 'jsreport-chrome-pdf';

@Injectable()
export class PdfReportsService {
  private jsreport: JsReport.Reporter;

  constructor() {
    //   private readonly prisma: PrismaService,
    this.jsreport = JsReport();
    this.jsreport.use(JsReportChromePdf());
 
    this.jsreport
      .init({
        extensions: {
          chrome: {
            launchOptions: {
              args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }, 
          },
        },
      })
      .then(() => {})
      .catch((err) => {
        console.error('Error initializing JsReport', err);
      });
  }

  async generarPagare(json: string) {
    console.log("json====")
    const facturaTemplate = 'reports/pagare.html';
    const templateHtml: string = fs.readFileSync(
      path.join(process.cwd(), facturaTemplate),
      'utf8', 
    );
    console.log(json)
    const tmpl = jsRender.templates(templateHtml); 
    const content = tmpl.render({});
    const result = await this.jsreport.render({
      template: {
        content: content,
        engine: 'none',
        recipe: 'chrome-pdf',
        chrome: {
          pdf: {
            format: 'Legal', // Directamente se puede usar 'Legal' para tamaño oficio
          },
        },
      },
    });
    return result.content.toString('base64');
  }
}

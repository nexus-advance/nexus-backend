import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as jsRender from 'jsrender';
import * as JsReport from 'jsreport-core';
import * as JsReportChromePdf from 'jsreport-chrome-pdf';
import { PrismaService } from 'src/common/services';
import { Miles, NumeroALetras, Unidades, diffDate, formatNumber, imprimirletras } from 'src/common/helpers';

@Injectable()
export class PdfReportsService {
  private jsreport: JsReport.Reporter;
  private meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]
  constructor(
    private readonly prisma: PrismaService,
  ) {
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
      .then(() => { })
      .catch((err) => {
        console.error('Error initializing JsReport', err);
      });
  }

  async prepararPagare(cre_code: string) {
    const credit = await this.prisma.nex_cre_credits.findFirst({
      where: {
        cre_code
      },
      include: {
        nex_cli_clients: {
          include: {
            nex_dis_districts_client: {
              include: {
                nex_mun_municipalities: {
                  include: {
                    nex_dep_departament: true,
                  }
                }
              }
            },
            nex_prf_profession: true,
          }
        }
      }
    });
    if (credit.nex_cli_clients.cli_dui == null || credit.nex_cli_clients.cli_dui.length < 9) {
      return '';
    }
    if (credit.cre_brut_amount == null || !(Number(credit.cre_brut_amount) > 0)) {
      return '';
    }
    if (credit.nex_cli_clients.nex_dis_districts_client == null) {
      return '';
    }
    if (credit.cre_date_start == null) {
      return '';
    }
    const address = credit.nex_cli_clients.nex_dis_districts_client.dis_names + ", Departamento de " + credit.nex_cli_clients.nex_dis_districts_client.nex_mun_municipalities.nex_dep_departament.dep_names;
    let dialetras = '';
    for (let index = 0; index < credit.nex_cli_clients.cli_dui.length; index++) {
      const element = credit.nex_cli_clients.cli_dui[index];
      if (index == 8) {
        dialetras = dialetras + " - " + imprimirletras(Number(element))
      } else {
        dialetras = dialetras + " " + imprimirletras(Number(element))
      }
    }
    let cre_date_start = credit.cre_date_start.toISOString().split("T")[0];
    let fecha_pre_documento = cre_date_start.split("-");
    let mes = this.meses[Number(cre_date_start[2]) - 1].toLowerCase();
    let dia = '';
    if (Number(cre_date_start[2]) > 1) {
      dia = "a los " + NumeroALetras(Number(cre_date_start[2])).toLowerCase().replace(" dólares", "") + "dias";
    } else {
      dia = "al  primer dia";
    }
    let fecha_documento = dia + " del mes de " + mes + " del año " + Miles(Number(fecha_pre_documento[0])).toLowerCase();
    let json = {
      monto_total_: formatNumber(credit.cre_brut_amount),
      monto_total_leta: NumeroALetras(credit.cre_brut_amount).toUpperCase(),
      monto_diario_letra: NumeroALetras(credit.cre_daily_quota).toUpperCase(),
      dias_letra: NumeroALetras(credit.cre_days).toUpperCase().replace(" DÓLARES", ""),
      cliente_nombre: credit.nex_cli_clients.cli_full_name.toUpperCase(),
      cliente_dui: credit.nex_cli_clients.cli_dui,
      cliente_dui_letra: dialetras,
      cliente_profesion: credit.nex_cli_clients.nex_prf_profession.prf_names,
      cliente_direccion: address,
      cliente_edad: diffDate(credit.nex_cli_clients.cli_birth_date.toISOString().split("T")[0]).toUpperCase(),
      cliente_edad_reynaldo: diffDate("1995-05-30").toUpperCase(),
      fecha_documento,
    }
    return this.generarPagare(json);
  }
  async generarPagare(json: any = {}) {

    const facturaTemplate = 'reports/pagare.html';
    const templateHtml: string = fs.readFileSync(
      path.join(process.cwd(), facturaTemplate),
      'utf8',
    );
    console.log(json)
    const tmpl = jsRender.templates(templateHtml);
    const content = tmpl.render(json);
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

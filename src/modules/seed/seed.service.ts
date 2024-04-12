import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('UsersService');

  constructor(private readonly prisma: PrismaService) { }

  async obtenerNombresDeTablas(prisma) {
    // Esta consulta obtiene los nombres de todas las tablas públicas que no son del sistema
    const tablas = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename NOT LIKE 'pg_%' AND tablename NOT LIKE '_prisma_%' AND tablename NOT LIKE 'sql_%';`;
    return tablas.map(t => t.tablename);
  }

  async deleteSeed() {
    const tablas = await this.obtenerNombresDeTablas(this.prisma);
    for (const nombreTabla of tablas) {
      await this.prisma.$executeRawUnsafe(`TRUNCATE TABLE "${nombreTabla}" RESTART IDENTITY CASCADE;`);
    }
  }

  async executeSeed() {
    try {
      await this.deleteSeed();
      var cremod = 'Creado por el seeder';
      await this.prisma.nex_usr_usuario.create({
        data: {
          usr_code_employe: '9505002',
          usr_names: 'Reynaldo Alexander',
          usr_surnames: 'Ruiz Rosales',
          usr_password: bcrypt.hashSync('9505002', 10),
          usr_attempts_faile: 0,
          usr_status: 'ACTIVE',
          usr_user_create: cremod,
          usr_user_update: cremod,
        },
      }); 

      await this.prisma.nex_gen_gender.createMany({
        data: [
          { gen_names: 'Masculino' },
          { gen_names: 'Femenino' },
        ]
      });
      await this.prisma.nex_prf_profession.createMany({
        data: [
          { prf_names: 'Estudiante' },
          { prf_names: 'Ama de Casa' },
          { prf_names: 'Comerciante' },
          { prf_names: 'Otro' },
        ]
      });
      await this.prisma.nex_per_percentage.createMany({
        data: [
          { per_days: 20, per_rate:14 }, 
          { per_days: 25, per_rate:15 }, 
          { per_days: 20, per_rate:16 }, 
        ]
      });

      await this.prisma.nex_mar_markeds.createMany({
        data: [
          { mar_name: 'Zacatecoluca' },
          { mar_name: 'San Juan Nonualco' },
          { mar_name: 'San Rafael' },
          { mar_name: 'Santiago Nonualco' },
        ]
      });
      await this.prisma.nex_cis_civil_status.createMany({
        data: [
          { cis_names: 'Soltero/a' },
          { cis_names: 'Casado/a' },
          { cis_names: 'Viudo/a' },
          { cis_names: 'Divorciado/divorciada' },
        ]
      });
      await this.prisma.nex_edl_education_level.createMany({
        data: [
          { edl_names: 'Parvulario' },
          { edl_names: 'Primero grado' },
          { edl_names: 'Segundo grado' },
          { edl_names: 'Tercero grado' },
          { edl_names: 'Cuarto grado' },
          { edl_names: 'Quinto grado' },
          { edl_names: 'Sexo grado' },
          { edl_names: 'Septimo grado' },
          { edl_names: 'Octavo grado' },
          { edl_names: 'Noveno grado' },
          { edl_names: 'Bachillerato' },
          { edl_names: 'Técnico' },
          { edl_names: 'Licenciado' },
          { edl_names: 'Ingeniero' },
        ]
      });

      await this.prisma.nex_rel_relationship.createMany({
        data: [
          { rel_names: 'Amigo/a' },
          { rel_names: 'Abuelo' },
          { rel_names: 'Abuela' },
          { rel_names: 'Nieto' },
          { rel_names: 'Nieta' },
          { rel_names: 'Tío/a' },
          { rel_names: 'Sobrino/a' },
          { rel_names: 'Primo/a' },
          { rel_names: 'Cuñado/a' },
          { rel_names: 'Suegro' },
          { rel_names: 'Suegra' },
          { rel_names: 'Yerno' },
          { rel_names: 'Nuera' },
          { rel_names: 'Otro' },
        ]
      });

      const municipios = [
        {
          nombre: 'Ahuachapán',
          municipios: [
            {
              nombre: 'Ahuachapán Norte',
              distritos: [
                { nombre: 'Atiquizaya' },
                { nombre: 'El Refugio' },
                { nombre: 'San Lorenzo' },
                { nombre: 'Turín' },
              ],
            },
            {
              nombre: 'Ahuachapán Centro',
              distritos: [
                { nombre: 'Ahuachapán' },
                { nombre: 'Apaneca' },
                { nombre: 'Concepción de Ataco' },
                { nombre: 'Tacuba' },
              ],
            },
            {
              nombre: 'Ahuachapán Sur',
              distritos: [
                { nombre: 'Guaymango' },
                { nombre: 'Jujutla' },
                { nombre: 'San Francisco Menéndez' },
                { nombre: 'San Pedro Puxtla' },
              ],
            },
          ],
        },
        {
          nombre: 'Cabañas',
          municipios: [
            {
              nombre: 'Cabañas Este',
              distritos: [
                { nombre: 'Guacotecti' },
                { nombre: 'San Isidro' },
                { nombre: 'Sensuntepeque' },
                { nombre: 'Victoria' },
                { nombre: 'Dolores' },
              ],
            },
            {
              nombre: 'Cabañas Oeste',
              distritos: [
                { nombre: 'Cinquera' },
                { nombre: 'Ilobasco' },
                { nombre: 'Jutiapa' },
                { nombre: 'Tejutepeque' },
              ],
            },
          ],
        },
        {
          nombre: 'Chalatenango',
          municipios: [
            {
              nombre: 'Chalatenango Norte',
              distritos: [
                { nombre: 'Citalá' },
                { nombre: 'La Palma' },
                { nombre: 'San Ignacio' },
              ],
            },
            {
              nombre: 'Chalatenango Centro',
              distritos: [
                { nombre: 'Agua Caliente' },
                { nombre: 'Dulce Nombre de María' },
                { nombre: 'El Paraíso' },
                { nombre: 'La Reina' },
                { nombre: 'Nueva Concepción' },
                { nombre: 'San Fernando' },
                { nombre: 'San Francisco Morazán' },
                { nombre: 'San Rafael' },
                { nombre: 'Santa Rita' },
                { nombre: 'Tejutla' },
              ],
            },
            {
              nombre: 'Chalatenango Sur',
              distritos: [
                { nombre: 'Arcatao' },
                { nombre: 'Azacualpa' },
                { nombre: 'Cancasque' },
                { nombre: 'Chalatenango' },
                { nombre: 'Comalapa' },
                { nombre: 'Concepción Quezaltepeque' },
                { nombre: 'El Carrizal' },
                { nombre: 'La Laguna' },
                { nombre: 'Las Vueltas' },
                { nombre: 'Las Flores' },
                { nombre: 'Nombre de Jesús' },
                { nombre: 'Nueva Trinidad' },
                { nombre: 'Ojos de Agua' },
                { nombre: 'Potonico' },
                { nombre: 'San Antonio de la Cruz' },
                { nombre: 'San Antonio Los Ranchos' },
                { nombre: 'San Francisco Lempa' },
                { nombre: 'San Isidro Labrador' },
                { nombre: 'San Luis del Carmen' },
                { nombre: 'San Miguel de Mercedes' },
              ],
            },
          ],
        },
        {
          nombre: 'Cuscatlán',
          municipios: [
            {
              nombre: 'Cuscatlán Norte',
              distritos: [
                { nombre: 'Suchitoto' },
                { nombre: 'San José Guayabal' },
                { nombre: 'Oratorio de Concepción' },
                { nombre: 'San Bartolomé Perulapía' },
                { nombre: 'San Pedro Perulapán' },
              ],
            },
            {
              nombre: 'Cuscatlán Sur',
              distritos: [
                { nombre: 'Cojutepeque' },
                { nombre: 'Candelaria' },
                { nombre: 'El Carmen' },
                { nombre: 'El Rosario' },
                { nombre: 'Monte San Juan' },
                { nombre: 'San Cristóbal' },
                { nombre: 'San Rafael Cedros' },
                { nombre: 'San Ramón' },
                { nombre: 'Santa Cruz Analquito' },
                { nombre: 'Santa Cruz Michapa' },
                { nombre: 'Tenancingo' },
              ],
            },
          ],
        },
        {
          nombre: 'La Libertad',
          municipios: [
            {
              nombre: 'La Libertad Norte',
              distritos: [
                { nombre: 'Quezaltepeque' },
                { nombre: 'San Matías' },
                { nombre: 'San Pablo Tacachico' },
              ],
            },
            {
              nombre: 'La Libertad Centro',
              distritos: [
                { nombre: 'San Juan Opico' },
                { nombre: 'Ciudad Arce' },
              ],
            },
            {
              nombre: 'La Libertad Oeste',
              distritos: [
                { nombre: 'Colón' },
                { nombre: 'Jayaque' },
                { nombre: 'Sacacoyo' },
                { nombre: 'Tepecoyo' },
                { nombre: 'Talnique' },
              ],
            },
            {
              nombre: 'La Libertad Este',
              distritos: [
                { nombre: 'Antiguo Cuscatlán' },
                { nombre: 'Huizúcar' },
                { nombre: 'Nuevo Cuscatlán' },
                { nombre: 'San José Villanueva' },
                { nombre: 'Zaragoza' },
              ],
            },
            {
              nombre: 'La Libertad Costa',
              distritos: [
                { nombre: 'Chiltiupán' },
                { nombre: 'Jicalapa' },
                { nombre: 'La Libertad' },
                { nombre: 'Tamanique' },
                { nombre: 'Teotepeque' },
              ],
            },
            {
              nombre: 'La Libertad Sur',
              distritos: [{ nombre: 'Santa Tecla' }, { nombre: 'Comasagua' }],
            },
          ],
        },
        {
          nombre: 'La Paz',
          municipios: [
            {
              nombre: 'La Paz Oeste',
              distritos: [
                { nombre: 'Cuyultitán' },
                { nombre: 'Olocuilta' },
                { nombre: 'San Juan Talpa' },
                { nombre: 'San Luis Talpa' },
                { nombre: 'San Pedro Masahuat' },
                { nombre: 'Tapalhuaca' },
                { nombre: 'San Francisco Chinameca' },
              ],
            },
            {
              nombre: 'La Paz Centro',
              distritos: [
                { nombre: 'El Rosario' },
                { nombre: 'Jerusalén' },
                { nombre: 'Mercedes La Ceiba' },
                { nombre: 'Paraíso de Osorio' },
                { nombre: 'San Antonio Masahuat' },
                { nombre: 'San Emigdio' },
                { nombre: 'San Juan Tepezontes' },
                { nombre: 'San Luis La Herradura' },
                { nombre: 'San Miguel Tepezontes' },
                { nombre: 'San Pedro Nonualco' },
                { nombre: 'Santa María Ostuma' },
                { nombre: 'Santiago Nonualco' },
              ],
            },
            {
              nombre: 'La Paz Este',
              distritos: [
                { nombre: 'San Juan Nonualco' },
                { nombre: 'San Rafael Obrajuelo' },
                { nombre: 'Zacatecoluca' },
              ],
            },
          ],
        },
        {
          nombre: 'La Unión',
          municipios: [
            {
              nombre: 'La Unión Norte',
              distritos: [
                { nombre: 'Anamorós' },
                { nombre: 'Bolívar' },
                { nombre: 'Concepción de Oriente' },
                { nombre: 'El Sauce' },
                { nombre: 'Lislique' },
                { nombre: 'Nueva Esparta' },
                { nombre: 'Pasaquina' },
                { nombre: 'Polorós' },
                { nombre: 'San José' },
                { nombre: 'Santa Rosa de Lima' },
              ],
            },
            {
              nombre: 'La Unión Sure',
              distritos: [
                { nombre: 'Conchagua' },
                { nombre: 'El Carmen' },
                { nombre: 'Intipucá' },
                { nombre: 'La Unión' },
                { nombre: 'Meanguera del Golfo' },
                { nombre: 'San Alejo' },
                { nombre: 'Yayantique' },
                { nombre: 'Yucuaiquín' },
              ],
            },
          ],
        },
        {
          nombre: 'Morazán',
          municipios: [
            {
              nombre: 'Morazán Norte',
              distritos: [
                { nombre: 'Arambala' },
                { nombre: 'Cacaopera' },
                { nombre: 'Corinto' },
                { nombre: 'El Rosario' },
                { nombre: 'Joateca' },
                { nombre: 'Jocoaitique' },
                { nombre: 'Meanguera' },
                { nombre: 'Perquín' },
                { nombre: 'San Fernando' },
                { nombre: 'San Isidro' },
                { nombre: 'Torola' },
              ],
            },
            {
              nombre: 'Morazán Sur',
              distritos: [
                { nombre: 'Chilanga' },
                { nombre: 'Delicias de Concepción' },
                { nombre: 'El Divisadero' },
                { nombre: 'Gualococti' },
                { nombre: 'Guatajiagua' },
                { nombre: 'Jocoro' },
                { nombre: 'Lolotiquillo' },
                { nombre: 'Osicala' },
                { nombre: 'San Carlos' },
                { nombre: 'San Francisco Gotera' },
                { nombre: 'San Simón' },
                { nombre: 'Sensembra' },
                { nombre: 'Sociedad' },
                { nombre: 'Yamabal' },
                { nombre: 'Yoloaiquín' },
              ],
            },
          ],
        },
        {
          nombre: 'San Miguel',
          municipios: [
            {
              nombre: 'San Miguel Norte',
              distritos: [
                { nombre: 'Ciudad Barrios' },
                { nombre: 'Sesori' },
                { nombre: 'Nuevo Edén de San Juan' },
                { nombre: 'San Gerardo' },
                { nombre: 'San Luis de la Reina' },
                { nombre: 'Carolina' },
                { nombre: 'San Antonio' },
                { nombre: 'Chapeltique' },
              ],
            },
            {
              nombre: 'San Miguel Centro',
              distritos: [
                { nombre: 'San Miguel' },
                { nombre: 'Comacarán' },
                { nombre: 'Uluazapa' },
                { nombre: 'Moncagua' },
                { nombre: 'Quelepa' },
                { nombre: 'Chirilagua' },
              ],
            },
            {
              nombre: 'San Miguel Oeste',
              distritos: [
                { nombre: 'Chinameca' },
                { nombre: 'El Tránsito' },
                { nombre: 'Lolotique' },
                { nombre: 'Nueva Guadalupe' },
                { nombre: 'San Jorge' },
                { nombre: 'San Rafael Oriente' },
              ],
            },
          ],
        },
        {
          nombre: 'San Salvador',
          municipios: [
            {
              nombre: 'San Salvador Norte',
              distritos: [
                { nombre: 'Aguilares' },
                { nombre: 'El Paisnal' },
                { nombre: 'Guazapa' },
              ],
            },
            {
              nombre: 'San Salvador Oeste',
              distritos: [{ nombre: 'Apopa' }, { nombre: 'Nejapa' }],
            },
            {
              nombre: 'San Salvador Este',
              distritos: [
                { nombre: 'Ilopango' },
                { nombre: 'San Martín' },
                { nombre: 'Soyapango' },
                { nombre: 'Tonacatepeque' },
              ],
            },
            {
              nombre: 'San Salvador Centro',
              distritos: [
                { nombre: 'Ayutuxtepeque' },
                { nombre: 'Mejicanos' },
                { nombre: 'Cuscatancingo' },
                { nombre: 'Ciudad Delgado' },
                { nombre: 'San Salvador' },
              ],
            },
            {
              nombre: 'San Salvador Sur',
              distritos: [
                { nombre: 'San Marcos' },
                { nombre: 'Santo Tomás' },
                { nombre: 'Santiago Texacuangos' },
                { nombre: 'Panchimalco' },
                { nombre: 'Rosario de Mora' },
              ],
            },
          ],
        },
        {
          nombre: 'San Vicente',
          municipios: [
            {
              nombre: 'San Vicente Norte',
              distritos: [
                { nombre: 'Apastepeque' },
                { nombre: 'Santa Clara' },
                { nombre: 'San Ildefonso' },
                { nombre: 'San Esteban Catarina' },
                { nombre: 'San Sebastián' },
                { nombre: 'San Lorenzo' },
                { nombre: 'Santo Domingo' },
              ],
            },
            {
              nombre: 'San Vicente Sur',
              distritos: [
                { nombre: 'San Vicente' },
                { nombre: 'Guadalupe' },
                { nombre: 'San Cayetano Istepeque' },
                { nombre: 'Tecoluca' },
                { nombre: 'Tepetitán' },
                { nombre: 'Verapaz' },
              ],
            },
          ],
        },
        {
          nombre: 'Santa Ana',
          municipios: [
            {
              nombre: 'Santa Ana Norte',
              distritos: [
                { nombre: 'Masahuat' },
                { nombre: 'Metapán' },
                { nombre: 'Santa Rosa Guachipilín' },
                { nombre: 'Texistepeque' },
              ],
            },
            {
              nombre: 'Santa Ana Centro',
              distritos: [{ nombre: 'Santa Ana' }],
            },
            {
              nombre: 'Santa Ana Este',
              distritos: [{ nombre: 'Coatepeque' }, { nombre: 'El Congo' }],
            },
            {
              nombre: 'Santa Ana Oeste',
              distritos: [
                { nombre: 'Candelaria de la Frontera' },
                { nombre: 'Chalchuapa' },
                { nombre: 'El Porvenir' },
                { nombre: 'San Antonio Pajonal' },
                { nombre: 'San Sebastián Salitrillo' },
                { nombre: 'Santiago de la Frontera' },
              ],
            },
          ],
        },
        {
          nombre: 'Sonsonate',
          municipios: [
            {
              nombre: 'Sonsonate Norte',
              distritos: [
                { nombre: 'Juayúa' },
                { nombre: 'Nahuizalco' },
                { nombre: 'Salcoatitán' },
                { nombre: 'Santa Catarina Masahuat' },
              ],
            },
            {
              nombre: 'Sonsonate Centro',
              distritos: [
                { nombre: 'Sonsonate' },
                { nombre: 'Sonzacate' },
                { nombre: 'Nahulingo' },
                { nombre: 'San Antonio del Monte' },
                { nombre: 'Santo Domingo de Guzmán' },
              ],
            },
            {
              nombre: 'Sonsonate Este',
              distritos: [
                { nombre: 'Armenia' },
                { nombre: 'Caluco' },
                { nombre: 'Cuisnahuat' },
                { nombre: 'Izalco' },
                { nombre: 'San Julián' },
                { nombre: 'Santa Isabel Ishuatán' },
              ],
            },
          ],
        },
        {
          nombre: 'Usulután',
          municipios: [
            {
              nombre: 'Usulután Norte',
              distritos: [
                { nombre: 'Alegría' },
                { nombre: 'Berlín' },
                { nombre: 'El Triunfo' },
                { nombre: 'Estanzuelas' },
                { nombre: 'Jucuapa' },
                { nombre: 'Mercedes Umaña' },
                { nombre: 'Nueva Granada' },
                { nombre: 'San Buenaventura' },
                { nombre: 'Santiago de María' },
              ],
            },
            {
              nombre: 'Usulután Este',
              distritos: [
                { nombre: 'California' },
                { nombre: 'Concepción Batres' },
                { nombre: 'Ereguayquín' },
                { nombre: 'Jucuarán' },
                { nombre: 'Ozatlán' },
                { nombre: 'Santa Elena' },
                { nombre: 'San Dionisio' },
                { nombre: 'Santa María' },
                { nombre: 'Tecapán' },
                { nombre: 'Usulután' },
              ],
            },
            {
              nombre: 'Usulután Oeste',
              distritos: [
                { nombre: 'Jiquilisco' },
                { nombre: 'Puerto El Triunfo' },
                { nombre: 'San Agustín' },
                { nombre: 'San Francisco Javier' },
              ],
            },
          ],
        },
      ];

      for (let depar of municipios) {
        const departamento = await this.prisma.nex_dep_departament.create({
          data: { dep_names: depar.nombre },
        });
        for (let mun of depar.municipios) {
          const municipio = await this.prisma.nex_mun_municipalities.create({
            data: { mun_names: mun.nombre, dep_code: departamento.dep_code },
          });
          for (let dist of mun.distritos) {
            await this.prisma.nex_dis_districts.create({
              data: { dis_names: dist.nombre, mun_code: municipio.mun_code },
            });
          }
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
}

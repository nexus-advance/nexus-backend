import { PartialType } from '@nestjs/swagger';
import { CreatePlanillaDto } from './create-planilla.dto';

export class UpdatePlanillaDto extends PartialType(CreatePlanillaDto) {}

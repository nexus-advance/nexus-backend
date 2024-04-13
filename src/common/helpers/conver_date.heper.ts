export function convert_date(fecha: string, time: TimeType = TimeType.None) {
  if (fecha==null || fecha.length < 8) {
    return new Date();
  }
  var dateParts = fecha.split('-');
  if (dateParts.length != 3) {
    return new Date();
  }
  if (time == TimeType.Inicio) {
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], 0, 0, 0, 0);
  }

  if (time == TimeType.Fin) {
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0], 23, 59, 59);
  }
  return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
}
export function convert_date_yyyy_mm_dd(fecha: string, time: TimeType = TimeType.None) {
  if (fecha==null || fecha.length < 8) {
    return new Date();
  }
  var dateParts = fecha.split('-');
  if (dateParts.length != 3) {
    return new Date();
  }
  if (time == TimeType.Inicio) {
    return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2], 0, 0, 0, 0);
  }

  if (time == TimeType.Fin) {
    return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2], 23, 59, 59);
  }
  return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
}
export enum TimeType {
  Inicio,
  Fin,
  None
}
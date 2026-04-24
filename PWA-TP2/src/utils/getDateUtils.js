export const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 es Domingo, 1 es Lunes, etc.

  // Matemática para encontrar cuántos días restar para llegar al Lunes.
  // Si hoy es Domingo (0), restamos 6 días. Si es otro día, restamos el día actual menos 1.
  const distanceToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

  // Creamos un objeto Date que apunte exactamente al Lunes de esta semana
  const monday = new Date(today);
  monday.setDate(today.getDate() + distanceToMonday);

  const weekDates = [];

  // Hacemos un bucle de 7 días a partir del Lunes
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    // Formateamos manualmente a YYYY-MM-DD para evitar errores de zona horaria
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    weekDates.push(`${day}/${month}/${year}`);
  }

  return weekDates;
};
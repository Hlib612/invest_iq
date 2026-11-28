export function formatMoney(value: number): string {
  const [int = '0', frac = '00'] = Math.abs(value).toFixed(2).split('.');
  const spaced = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${value < 0 ? '-' : ''}${spaced}.${frac}`;
}

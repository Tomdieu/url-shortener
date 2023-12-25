import millify from 'millify';


export const formatNumber = (num:number) => {
    return millify(num, {
        precision: 2,  // Number of decimal places
        lowercase: true,  // Use lowercase units (e.g., 'k' instead of 'K')
        units: ['', 'K', 'M', 'B', 'T'],  // Custom units
      });
}
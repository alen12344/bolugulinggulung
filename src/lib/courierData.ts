import { CourierOption } from './types';

export const INITIAL_COURIERS: CourierOption[] = [
  {
    code: 'jne',
    name: 'JNE Express',
    service: 'REG (Reguler Service)',
    etd: '1 - 2 Hari',
    cost: 18000,
  },
  {
    code: 'jne_yes',
    name: 'JNE Express',
    service: 'YES (Yakin Esok Sampai)',
    etd: '1 Hari (Besok Sampai)',
    cost: 28000,
  },
  {
    code: 'sicepat',
    name: 'SiCepat Ekspres',
    service: 'BEST (Besok Sampai Tujuan)',
    etd: '1 Hari',
    cost: 22000,
  },
  {
    code: 'jnt',
    name: 'J&T Express',
    service: 'EZ (Standard Delivery)',
    etd: '1 - 2 Hari',
    cost: 19000,
  },
  {
    code: 'gosend',
    name: 'GoSend Instant',
    service: 'Instant (Delivery via Gojek)',
    etd: '2 - 3 Jam',
    cost: 35000,
  },
  {
    code: 'grab',
    name: 'GrabExpress',
    service: 'Instant Sameday',
    etd: '3 - 4 Jam',
    cost: 30000,
  },
];

export function calculateShippingCosts(weightTotalGrams: number, destinationCity: string): CourierOption[] {
  // Base multiplier based on weight in Kg (min 1kg)
  const weightKg = Math.max(1, Math.ceil(weightTotalGrams / 1000));
  
  // City distance factor simulation
  let cityFactor = 1.0;
  const lowerCity = destinationCity.toLowerCase();
  if (lowerCity.includes('metro') || lowerCity.includes('lampung')) {
    cityFactor = 0.6; // Local area, cheaper
  } else if (lowerCity.includes('jakarta') || lowerCity.includes('bandung')) {
    cityFactor = 1.1;
  } else if (lowerCity.includes('surabaya') || lowerCity.includes('medan')) {
    cityFactor = 1.4;
  }

  return INITIAL_COURIERS.map((c) => {
    let cost = Math.round(c.cost * weightKg * cityFactor);
    if (c.code.includes('gosend') || c.code.includes('grab')) {
      // Instant couriers local only
      if (!lowerCity.includes('metro') && !lowerCity.includes('lampung') && lowerCity.length > 0) {
        cost = Math.round(c.cost * 1.5);
      }
    }
    return {
      ...c,
      cost: Math.max(10000, cost),
    };
  });
}

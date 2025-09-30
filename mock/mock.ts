export const mockAiOutput = {
  merchant: "Starbucks",
  date: "2024-06-15",
  items: [
    { name: "Latte", qty: 1, price: 5.0 },
    { name: "Muffin", qty: 2, price: 8.0 },
  ],
  total: 13.0,
};

export const mockAiList = [
  mockAiOutput,
  {
    merchant: "Whole Foods",
    date: "2024-06-14",
    items: [
      { name: "Bananas", qty: 6, price: 3.0 },
      { name: "Milk", qty: 1, price: 4.0 },
    ],
    total: 7.0,
  },
];

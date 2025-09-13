export const mockData = Array.from({ length: 5000 }, (_, i) => ({
  id: i.toString(),
  title: `Test ${i + 1}`,
  description: `Dummy Data for Testing ${i + 1}`,
}));

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ShipmentData {
  day: number;
  shipment: number;
  delivery: number;
}

const ShipmentStatistics = () => {
  const data: ShipmentData[] = [
    { day: 10, shipment: 45, delivery: 30 },
    { day: 11, shipment: 55, delivery: 32 },
    { day: 12, shipment: 40, delivery: 28 },
    { day: 13, shipment: 35, delivery: 25 },
    { day: 14, shipment: 18, delivery: 12 },
    { day: 15, shipment: 25, delivery: 20 },
    { day: 16, shipment: 45, delivery: 35 },
    { day: 17, shipment: 28, delivery: 15 },
    { day: 18, shipment: 32, delivery: 25 },
    { day: 19, shipment: 52, delivery: 38 }
  ];

  return (
    <div className="w-full max-w-3xl p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Dairy Sale Statistics</h2>
        <p className="text-sm text-gray-500">Total number of Sales in Rupee 72.8K</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="day" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
            />
            <Bar 
              dataKey="shipment" 
              name="Sales" 
              fill="#111827" 
              radius={[2, 2, 0, 0]}
              barSize={12}
            />
            <Bar 
              dataKey="delivery" 
              name="Delivery"   
              fill="#E5E7EB" 
              radius={[2, 2, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ShipmentStatistics;
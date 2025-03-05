/* eslint-disable react/prop-types */
import { eachDayOfInterval, format, formatDate, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};
function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings.filter((booking) =>
        isSameDay(date, new Date(booking.created_at))
      ).reduce((acc,curr)=>acc+curr.totalPrice,0),
      extrasSales: bookings.filter((booking) =>
        isSameDay(date, new Date(booking.created_at))
      ).reduce((acc,curr)=>acc+curr.extrasPrice,0),
    };
  });
  return (
    <div className="p-10 bg-grey-0 rounded-lg flex flex-col gap-4">
      <h1 className="text-3xl font-semibold text-start">Sales from {formatDate(allDates[0],"MMM dd yyyy")} to {formatDate(allDates[allDates.length-1],"MMM dd yyyy")}</h1>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name="Total Sales"
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extra Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;

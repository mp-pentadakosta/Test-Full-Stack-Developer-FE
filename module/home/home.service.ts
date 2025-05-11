import { TypeDataChart } from "@/components/chart.component";

export const HomeService = () => {
  const dataChart: TypeDataChart[] = [
    {
      id: "Expenses",
      data: [
        { x: "January", y: 0 },
        { x: "February", y: 200 },
        { x: "March", y: 400 },
        { x: "April", y: 100 },
        { x: "May", y: 500 },
        { x: "June", y: 300 },
        { x: "July", y: 600 },
        { x: "August", y: 200 },
        { x: "September", y: 400 },
        { x: "October", y: 100 },
        { x: "November", y: 0 },
        { x: "December", y: 600 },
      ],
    },
    {
      id: "Sales",
      data: [
        { x: "January", y: 200 },
        { x: "February", y: 300 },
        { x: "March", y: 500 },
        { x: "April", y: 200 },
        { x: "May", y: 600 },
        { x: "June", y: 400 },
        { x: "July", y: 100 },
        { x: "August", y: 300 },
        { x: "September", y: 500 },
        { x: "October", y: 200 },
        { x: "November", y: 300 },
        { x: "December", y: 0 },
      ],
    },
  ];

  return {
    dataChart,
  };
};

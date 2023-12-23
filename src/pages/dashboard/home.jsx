import React from "react";
import {
  UsersIcon,
  RocketLaunchIcon,
  LifebuoyIcon
} from "@heroicons/react/24/solid";
import {
  Typography,
  Card,
  CardHeader,
  CardBody
} from "@material-tailwind/react";

import { StatisticsCard } from "@/widgets/cards";
import { useStatistics } from '../../api/useStatistics';
import { useClubs } from '../../api/useClubs';


export function Home() {
  const { data: statisticsData, loading: statisticsLoading, error: statisticsError } = useStatistics();
  const { data: clubsData, loading: clubsLoading, error: clubsError } = useClubs();

  if (statisticsLoading || clubsLoading) return <div>Loading...</div>;
  if (statisticsError) return <div>Error: {statisticsError.message}</div>;
  if (clubsError) return <div>Error: {clubsError.message}</div>;

  const statisticsCardsData = statisticsData ? [
    {
      color: "gray",
      icon: RocketLaunchIcon,
      title: "Total Clubs",
      value: statisticsData.total_clubs,
      footer: {
        color: statisticsData.club_percentage_change >= 0 ? "text-green-500" : "text-red-500",
        value: `${statisticsData.club_percentage_change.toFixed(2)}%`,
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Presidents",
      value: statisticsData.total_presidents,
      footer: {
        color: statisticsData.president_percentage_change >= 0 ? "text-green-500" : "text-red-500",
        value: `${statisticsData.president_percentage_change.toFixed(2)}%`,
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: LifebuoyIcon,
      title: "Total Managers",
      value: statisticsData.total_managers,
      footer: {
        color: statisticsData.manager_percentage_change >= 0 ? "text-green-500" : "text-red-500",
        value: `${statisticsData.manager_percentage_change.toFixed(2)}%`,
        label: "than last week",
      },
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Total Players",
      value: statisticsData.total_players,
      footer: {
        color: statisticsData.player_percentage_change >= 0 ? "text-green-500" : "text-red-500",
        value: `${statisticsData.player_percentage_change.toFixed(2)}%`,
        label: "than last week",
      },
    },
  ] : [];

  return (
    <div className="mt-12">
    <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
        <StatisticsCard
          key={title}
          {...rest}
          title={title}
          icon={React.createElement(icon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className={footer.color}>{footer.value}</strong>
              &nbsp;{footer.label}
            </Typography>
          }
        />
      ))}
    </div>
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div className="">
              <Typography variant="h6" color="blue-gray" className="mb-0 font-bold">
                Clubs
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Logo", "Clubs", "Teams", "Managers", "Players"].map((el) => (
                  <th key={el} className="border-b border-blue-gray-50 py-3 px-6 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clubsData.data.map((club, key) => {
                const className = `py-3 px-5 ${
                  key === clubsData.data.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={club.id}>
                    <td className={className}>
                      <img 
                        src={club.logo_url} 
                        alt={club.name + " Logo"} 
                        className="w-12 h-12 object-cover rounded-full" 
                      />
                    </td>
                    <td className={className}>
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {club.name}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                        {club.teams}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                        {club.managers}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                        {club.players}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        </Card>
      </div>
  </div>
  );
}

export default Home;

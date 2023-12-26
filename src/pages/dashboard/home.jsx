import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UsersIcon,
  RocketLaunchIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";
import {
  Typography,
  CardHeader,
  Button,
} from "@material-tailwind/react";
import CreatePresidentModal from '../../modals/createPresidentModal';
import CreateClubModal from '../../modals/createClubModal';
import CreateTeamModal from "@/modals/createTeamModal";
import CreateManagerModal from "@/modals/createManagerModal";
import { StatisticsCard } from "@/widgets/cards";
import { useStatistics } from '../../api/useStatistics';
import { ToastContainer, toast } from 'react-toastify';
import { TeamsTable } from "../components/teamsTable";
import { ClubsTable } from "../components/clubsTable";
import { UsersTable } from "../components/usersTable";
import 'react-toastify/dist/ReactToastify.css';


export function Home() {
  const navigate = useNavigate();
  const { data: statisticsData, loading: statisticsLoading, error: statisticsError } = useStatistics();

  useEffect(() => {
    setTimeout(() => {
      const signInSuccess = localStorage.getItem("signInSuccess");
      if (signInSuccess) {
        toast.success("Sign-in successful!");
        localStorage.removeItem("signInSuccess");
      }
    }, 100);
  }, []);

  if (statisticsLoading ) return <div>Loading...</div>;
  if ((statisticsError  ) && (!statisticsData )) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <Typography variant="h5" className="mb-4">
          {statisticsError?.message}
        </Typography>
        <Button
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Login Page and Log In
        </Button>
      </div>
    );
  }


  const statisticsCardsData = statisticsData ? [
    {
      color: "gray",
      icon: RocketLaunchIcon,
      title: "Total Clubs",
      subtitle: ".",
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
      subtitle: ".",
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
      subtitle: "with a Team",
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
      subtitle: "with a Team",
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
      <ToastContainer position="top-right"
        autoClose={1750}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, subtitle ,footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            subtitle={subtitle}
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
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex flex-wrap items-center justify-between p-6"
      >
        <div className="flex flex-wrap gap-2">
          <CreatePresidentModal />
          <CreateClubModal />
          <CreateTeamModal />
          <CreateManagerModal />
        </div>
      </CardHeader>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ClubsTable />
        <UsersTable />
        <TeamsTable />
      </div>
    </div>
  );
}

export default Home;

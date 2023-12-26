import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "@material-tailwind/react";
import { useTeams } from '../../api/useTeams';
import 'react-toastify/dist/ReactToastify.css';

export function TeamsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: teamsData, loading: teamsLoading, error: teamsError } = useTeams();
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 10;

  if (teamsLoading) return <div>Loading...</div>;
  if (teamsError) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <Typography variant="h5" className="mb-4">
          {teamsError.message}
        </Typography>
        <Button
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Login Page and Log In
        </Button>
      </div>
    );
  }

  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const filteredTeams = teamsData.data.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.club.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div className="">
          <Typography variant="h6" color="blue-gray" className="mb-0 font-bold">
            Teams
          </Typography>
        </div>
        <div className="md:w-56">
          <Input
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll overflow-y-auto px-0 pt-0 pb-2" style={{ height: '450px' }}>
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Team", "Club", "Managers", "Players"].map((el) => (
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
            {currentTeams.map((team, key) => {
              const className = `py-3 px-5 ${key === currentTeams.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;
              return (
                <tr key={team.id}>
                  <td className={className}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {team.name}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {team.club}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {team.managers}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {team.players}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <div className="flex justify-center mt-4">
        {filteredTeams.length > teamsPerPage && (
          <nav>
            <ul className="pagination flex mb-2">
              {Array.from({ length: Math.ceil(filteredTeams.length / teamsPerPage) }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      marginRight: "5px",
                      padding: "5px 10px",
                      cursor: "pointer",
                      backgroundColor: currentPage === index + 1 ? "black" : "",
                      color: currentPage === index + 1 ? "white" : "",
                    }}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </Card>
  );
}

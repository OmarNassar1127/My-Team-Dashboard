import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "@material-tailwind/react";
import { useClubs } from '../../api/useClubs';
import 'react-toastify/dist/ReactToastify.css';

export function ClubsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: clubsData, loading: clubsLoading, error: clubsError } = useClubs();
  const [currentPage, setCurrentPage] = useState(1);
  const clubsPerPage = 6;

  if (clubsLoading) return <div>Loading...</div>;
  if (clubsError) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <Typography variant="h5" className="mb-4">
          {clubsError.message}
        </Typography>
        <Button
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Login Page and Log In
        </Button>
      </div>
    );
  }

  const indexOfLastClub = currentPage * clubsPerPage;
  const indexOfFirstClub = indexOfLastClub - clubsPerPage;
  const filteredClubs = clubsData.data.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentClubs = filteredClubs.slice(indexOfFirstClub, indexOfLastClub);

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
            Clubs
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
            {currentClubs.map((club, key) => {
              const className = `py-3 px-5 ${key === currentClubs.length - 1 ? "" : "border-b border-blue-gray-50"
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
      <div className="flex justify-center mt-4">
        {filteredClubs.length > clubsPerPage && (
          <nav>
            <ul className="pagination flex mb-2">
              {Array.from({ length: Math.ceil(filteredClubs.length / clubsPerPage) }).map((_, index) => (
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

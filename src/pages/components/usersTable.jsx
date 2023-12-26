import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
} from "@material-tailwind/react";
import { useUsers } from '../../api/useUsers';
import 'react-toastify/dist/ReactToastify.css';

export function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: usersData, loading: usersLoading, error: usersError } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  if (usersLoading) return <div>Loading...</div>;
  if (usersError) {
    return (
      <div className="flex flex-col items-center justify-center mt-12">
        <Typography variant="h5" className="mb-4">
          {usersError.message}
        </Typography>
        <Button
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Login Page and Log In
        </Button>
      </div>
    );
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = usersData.data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Card className="overflow-hidden xl:col-span-1 border border-blue-gray-100 shadow-sm min-w-[320px]">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div className="">
          <Typography variant="h6" color="blue-gray" className="mb-0 font-bold">
            Users
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
        <table className="w-full min-w-[150px] table-auto">
          <thead>
            <tr>
              {["User", "Role",].map((el) => (
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
            {currentUsers.map((user, key) => {
              const className = `py-3 px-5 ${key === currentUsers.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;
              return (
                <tr key={user.id}>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {user.name}
                    </Typography>
                  </td>
                  <td className={className}>
                    <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                      {user.role}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <div className="flex justify-center mt-4">
        {filteredUsers.length > usersPerPage && (
          <nav>
            <ul className="pagination flex mb-2">
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
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
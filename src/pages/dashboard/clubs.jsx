import React, { useState } from 'react';
import {
  Typography,
  Input,
} from "@material-tailwind/react";
import { useClubs } from '@/api/useClubs';
import { ClubsCard } from "../../widgets/cards/clubs-card"

export function Clubs() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: clubsData, loading: clubsLoading, error: clubsError } = useClubs();

  // Filter clubs based on search query
  const filteredClubs = clubsData?.filter((club) =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6 px-4 md:px-6 lg:px-8">
      <Input
        label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-6 mb-12 grid gap-y-10 gap-x-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredClubs && filteredClubs.map((club) => (
          <ClubsCard
            key={club.id}
            logo={club.logo_url}
            name={club.name}
            teams={club.teams}
            managers={club.managers}
            players={club.players}
          />
        ))}
        {clubsData && clubsData.length === 0 && (
          <Typography color="gray">
            No clubs found.
          </Typography>
        )}
      </div>
    </div>
  );
}
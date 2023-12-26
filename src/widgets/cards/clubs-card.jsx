import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function ClubsCard({ id, logo, name, teams, managers, players }) {
  return (
    <Card className="flex flex-col items-center justify-center border border-blue-gray-100 shadow-sm p-6 rounded-xl">
      <CardHeader
        variant="gradient"
        floated={false}
        shadow={false}
        className="grid h-16 w-16 place-items-center mb-4"
      >
        <img src={logo} alt={`${name} Logo`} className="w-12 h-12 object-cover rounded-full" />
      </CardHeader>
      <CardBody className="p-5 text-center">
        <input type="hidden" value={id} />

        <Typography variant="h5" className="font-bold text-black mb-2">
          {name}
        </Typography>

        <Typography variant="paragraph" className="text-black">
          Teams: {teams}
        </Typography>

        <Typography variant="paragraph" className="text-black">
          Manager: {managers}
        </Typography>

        <Typography variant="paragraph" className="text-black">
          Player: {players}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default ClubsCard;

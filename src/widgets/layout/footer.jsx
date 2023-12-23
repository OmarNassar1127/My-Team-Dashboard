import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Typography
            variant="body2"
            color="blue-gray"
            className="text-center"
          >
            &copy; {year}{" "}
            <a
              href={brandLink}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-gray-500 transition-colors duration-200"
            >
              {brandName}
            </a>
            . All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            color="blue-gray"
            className="text-center"
          >
            Made with{" "}
            <HeartIcon
              strokeWidth={2}
              className="h-5 w-5 text-red-500 inline-block"
            />{" "}
            by{" "}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-gray-500 transition-colors duration-200"
            >
              My Team
            </a>
            .
          </Typography>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "MyTeam",
  brandLink: "https://www.creative-tim.com",
  routes: [
    { name: "MyTeam", path: "#" }
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;

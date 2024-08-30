import PropTypes from "prop-types";

interface TeamMember {
  picture: string;
  fullName: string;
  designation: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    picture: "https://cdn.easyfrontend.com/pictures/team/team_square_1.jpeg",
    fullName: "Salman Abdullah Fahim",
    designation: "Founder / CEO",
    bio: "Fahim is the visionary behind T. Meeting.",
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/team/team_square_2.jpeg",
    fullName: "Raima Renata",
    designation: "Business Head",
    bio: "Raima oversees all business operations at T. Meeting. Her expertise in strategic planning and business development ensures the company's continued growth and success.",
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/team/team_square_3.jpeg",
    fullName: "Tomas Kruck",
    designation: "UI Design",
    bio: "Tomas is the creative mind behind our user interfaces. His designs are both aesthetically pleasing and highly functional, enhancing the user experience of our products.",
  },
  {
    picture: "https://cdn.easyfrontend.com/pictures/team/team_square_4.jpeg",
    fullName: "Angela Julia",
    designation: "Marketing Head",
    bio: "Julia drives the marketing strategies at T. Meeting. Her innovative campaigns and deep understanding of market trends help us connect with our audience effectively.",
  },
];

interface TeamMemberItemProps {
  member: TeamMember;
}

const TeamMemberItem: React.FC<TeamMemberItemProps> = ({ member }) => (
  <div
    className="bg-white shadow-xl rounded-2xl h-full"
    data-aos="fade-up"
    data-aos-duration="1500"
  >
    <img
      src={member.picture}
      alt={member.fullName}
      className="h-auto w-full rounded-2xl"
    />
    <div className="px-4 py-6 xl:px-6">
      <h4 className="text-2xl font-medium mb-2">{member.fullName}</h4>
      <h6 className="font-medium mb-2">{member.designation}</h6>
      <p className="opacity-50 text-justify">{member.bio}</p>
    </div>
  </div>
);

TeamMemberItem.propTypes = {
  member: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

const Teams: React.FC = () => {
  return (
    <section className="ezy__team1 light py-14 md:py-18 bg-white text-zinc-900 mt-6 ">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center mb-6 md:mb-12">
          <div className="max-w-lg text-center">
            <h2 className="text-3xl leading-none font-bold mb-2 ">
              OUR EXPERT <span className="text-headerText">TEAM</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 text-center">
          {teamMembers.map((member, i) => (
            <div
              className="col-span-12 sm:col-span-6 lg:col-span-3 mx-4"
              key={i}
            >
              <TeamMemberItem member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;

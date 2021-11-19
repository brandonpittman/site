import format from "date-fns/fp/format";

const NowLead = ({ date }) => {
  const lastUpdated = format("MMMM d, yyyy")(new Date(date));
  return (
    <p>
      <span className="block">
        This is a{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://nownownow.com/about"
        >
          Now
        </a>{" "}
        page.
      </span>
      <span className="block">Last updated on {lastUpdated}.</span>
    </p>
  );
};

export default NowLead;

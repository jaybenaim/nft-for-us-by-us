const Footer = () => {
  return (
    <footer className="flex flex-col p-6 text-center text-white/80 sm:p-12">
      <p>
        Created by{" "}
        <a
          href="https://jacobbenaim.ca"
          target="_blank"
          className="font-semibold hover:text-white hover:underline"
          rel="noreferrer"
        >
          Jacob Benaim
        </a>
      </p>

      <p>
        Shoutout to{" "}
        <a href="https://www.vecteezy.com/free-vector/line-drawing-face">
          Line Drawing Face Vectors by Vecteezy
        </a>
        for the amazing svg vector.
      </p>
    </footer>
  );
};

export default Footer;

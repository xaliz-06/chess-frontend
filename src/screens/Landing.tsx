import { useNavigate } from "react-router-dom";
import chessImg from "../assets/chess_hero.jpeg";
import Button from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/game");
  };
  return (
    <div className="w-[80vw] min-h-[60vh] p-10 bg-slate-700 rounded-lg grid grid-cols-1 gap-4 md:grid-cols-2 items-center">
      <div className="flex justify-center">
        <img
          src={chessImg}
          alt="chessHero"
          className="max-w-[90%] max-h-[50%] md:max-w-[80%] md:max-h-[80%] rounded-lg"
        />
      </div>
      <div className="p-5 flex flex-col">
        <h1 className="text-4xl font-bold text-white">Welcome to ChessHero</h1>
        <Button onClick={handleJoin}>Join Game</Button>
      </div>
    </div>
  );
};

export default Landing;

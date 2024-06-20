import { useEffect, useState } from "react";
import Button from "../components/Button";
import ChessBoard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { INIT_GAME, MOVE } from "../utils/messages";
import { Chess } from "chess.js";
import { Move, Turn } from "../types/types";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState<boolean>(false);
  const [turn, setTurn] = useState<Turn>("white");

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === INIT_GAME) {
        setChess(new Chess());
        setBoard(chess.board());
        console.log("Game started");
        setStarted(true);
      }
      if (message.type === MOVE) {
        console.log(message);
        const move: Move = {
          from: message.payload.move.from,
          to: message.payload.move.to,
        };
        console.log(move);
        chess.move(move);
        setBoard(chess.board());
        setTurn(message.payload.turn);
      }
    };
  }, [socket, chess]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="w-[70vw] min-h-[60vh] p-10 bg-slate-700 rounded-lg flex justify-center">
      <div className="pt-4 px-6 w-full">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <ChessBoard
              chess={chess}
              setBoard={setBoard}
              socket={socket}
              board={board}
              turn={turn}
              setTurn={setTurn}
            />
          </div>
          <div className="col-span-4 bg-slate-800 p-3 rounded-lg flex justify-center items-start">
            {!started ? (
              <Button
                onClick={() => {
                  socket.send(
                    JSON.stringify({
                      type: INIT_GAME,
                    })
                  );
                }}
              >
                Play
              </Button>
            ) : (
              <div className="flex justify-center">
                <h1 className="bg-blue-800 p-4 m-4 text-xl font-bold rounded-lg w-[100%]">
                  Turn: {turn}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;

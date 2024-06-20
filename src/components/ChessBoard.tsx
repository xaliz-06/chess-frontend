import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../utils/messages";
import { Turn } from "../types/types";

const ChessBoard = ({
  chess,
  setBoard,
  board,
  socket,
  turn,
  setTurn,
}: {
  chess: Chess;
  setBoard: React.Dispatch<
    React.SetStateAction<
      ({
        square: Square;
        type: PieceSymbol;
        color: Color;
      } | null)[][]
    >
  >;
  turn: Turn;
  setTurn: React.Dispatch<React.SetStateAction<Turn>>;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setForm] = useState<Square | null>(null);

  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const color = (i + j) % 2 === 0 ? "bg-gray-500" : "bg-gray-400";

              const squareRep = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  key={j}
                  className={`w-20 h-20 flex justify-center items-center ${color}`}
                  onClick={() => {
                    if (!from) {
                      setForm(squareRep);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from: from,
                              to: squareRep,
                            },
                          },
                        })
                      );
                      setForm(null);
                      chess.move({
                        from: from,
                        to: squareRep,
                      });
                      setBoard(chess.board());
                      setTurn(() => {
                        if (turn === "white") return "black" as Turn;
                        if (turn === "black") return "white" as Turn;
                        return turn;
                      });
                    }
                  }}
                >
                  {square ? (
                    <img
                      className="w-12"
                      src={`/${
                        square?.color === "b"
                          ? square?.type
                          : `${square?.type?.toUpperCase()}`
                      }.png`}
                    />
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;

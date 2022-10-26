import { getColors } from "./constants";

interface Proptypes {
  num: number;
}

function Cell({ num }: Proptypes) {
  return (
    <div
      style={{
        height: 90,
        width: 90,
        padding: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
        fontSize: 40,
        fontWeight: 800,
        background: getColors(num),
        color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
      }}
    >
      {num !== 0 ? num : ""}
    </div>
  );
}

export default Cell;

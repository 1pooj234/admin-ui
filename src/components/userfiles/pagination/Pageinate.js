import Button from "../../uiElements/Button";
import "./Paginate.css";
const Paginate = (props) => {
  const { curPage, totalUsers, noOfUsersPerPage, paginate } = props;
  const number = [];
  for (let i = 1; i <= Math.ceil(totalUsers / noOfUsersPerPage); i++) {
    number.push(i);
  }
  return (
    <div className="button-container">
      <Button
        className="arrow-btn"
        isDisabled={curPage === number[0]}
        click={() => paginate(number[0], 0)}
      >
        <img
          className="icon"
          alt="backward arrow icon"
          src="https://icons-for-free.com/download-icon-arrows+double+arrow+doublechevronleft+left+icon-1320185729725994033_512.png"
        />
      </Button>

      <Button
        className="arrow-btn"
        isDisabled={
          totalUsers === 0 ||
          curPage === Math.ceil(totalUsers / noOfUsersPerPage)
        }
        click={() => paginate(curPage, 1)}
      >
        <img
          className="icon"
          alt="backward arrow icon"
          src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-droite-noir.png"
        />
      </Button>
      {number.map((pageNo) => (
        <Button
          className="number-btn active"
          click={() => paginate(pageNo)}
          key={pageNo}
        >
          <b>{pageNo}</b>
        </Button>
      ))}
      <Button
        className="arrow-btn"
        isDisabled={totalUsers === 0 || curPage === 1}
        click={() => paginate(curPage, -1)}
      >
        <img
          className="icon"
          alt="backward arrow icon"
          src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-noir.png"
        />
      </Button>
      <Button
        className="arrow-btn"
        isDisabled={curPage === number.length}
        click={() => paginate(number.length, 0)}
      >
        <img
          className="icon"
          alt="backward arrow icon"
          src="https://icons-for-free.com/download-icon-double+arrow+doublechevronright+right+arrows+icon-1320185729292506033_512.png"
        />
      </Button>
    </div>
  );
};

export default Paginate;

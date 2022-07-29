import "./Pagination.css";
import Button from "./uiElements/Button";
const Pagination = (props) => {
  const { totalUsers, usersPerPage, curPage } = props;
  const pageNos = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNos.push(i);
  }
  return (
    <div className="btn_section">
      <Button
        className="nav_btn"
        isdisabled={curPage === 1}
        click={() => props.paginate(1)}
        image="https://icons-for-free.com/download-icon-arrows+double+arrow+doublechevronleft+left+icon-1320185729725994033_512.png"
      ></Button>
      <Button
        className="nav_btn"
        isdisabled={curPage === pageNos.slice(-1)[0]}
        click={() => props.paginate(curPage + 1)}
        image="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-droite-noir.png"
      ></Button>
      {pageNos.map((pageNo) => (
        <Button
          className="page_btn"
          label={pageNo}
          key={pageNo}
          click={() => props.paginate(pageNo)}
        >
          {pageNo}
        </Button>
      ))}
      <Button
        className="nav_btn"
        click={() => props.paginate(curPage - 1)}
        isdisabled={curPage === 1}
        image="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-noir.png"
      ></Button>
      <Button
        className="nav_btn"
        isdisabled={curPage === pageNos.slice(-1)[0]}
        click={() => props.paginate(pageNos.slice(-1)[0])}
        image="https://icons-for-free.com/download-icon-double+arrow+doublechevronright+right+arrows+icon-1320185729292506033_512.png"
      ></Button>
    </div>
  );
};

export default Pagination;

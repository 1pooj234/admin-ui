const Columns = (props) => {
  const { name, email, role } = props;

  const columnEl =
    props.type === "child" ? (
      <>
        <div className="column-entries ">
          <p>{name}</p>
        </div>
        <div className="column-entries ">
          <p>{email}</p>
        </div>
        <div className="column-entries ">
          <p>{role}</p>
        </div>
      </>
    ) : (
      <>
        <div className="table-cell">
          <p>
            <b>Name</b>
          </p>
        </div>
        <div className="table-cell">
          <p>
            <b>Email</b>
          </p>
        </div>
        <div className="table-cell">
          <p>
            <b>Member</b>
          </p>
        </div>
      </>
    );
  return <>{columnEl}</>;
};

export default Columns;

const Buscador = (props) => {

    return (
        <>
            <form className="d-flex text-black" role="search">
                <input
                    style={{ color: "black", fontWeight: "600" }}
                    className="form-control my-3 bg-info bg-opacity-10 border-info rounded-start-5 rounded-end-0 buscador"
                    type="search"
                    placeholder={props.placeholder}
                    value={props.search}
                    onChange={props.handleChange}
                />
                <button
                    type="button"
                    className="btn btn-outline-warning text-blue rounded-start-0 rounded-end-5 my-3 fw-semibold"
                    onClick={props.onClick}
                >Buscar</button>
            </form>
        </>
    );
};

export default Buscador;